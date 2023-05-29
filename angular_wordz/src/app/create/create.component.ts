import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { make_WordList } from 'src/models/make_wordList.model';
import { ActivatedRoute, Router } from '@angular/router';
import { wordService } from 'src/service/word.service';
import { ListService } from 'src/service/list.service';
import { WordItem } from 'src/models/wordItem.model';
import { WordList } from 'src/models/WordList.model';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { land } from 'src/models/land.model';
import { lands } from 'src/assets/lands';
import { GameService } from 'src/service/game.service';
import { AvailableGames } from 'src/models/Games';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild("word_input") word_input?: ElementRef

  set_land1_by_key: Subject<string> = new Subject<string>()
  set_land2_by_key: Subject<string> = new Subject<string>()

  land1: land = { key: "", name: "" }
  land2: land = { key: "", name: "" }

  set_land1: Subject<land> = new BehaviorSubject<land>(this.land1)
  set_land2: Subject<land> = new BehaviorSubject<land>(this.land2)

  list_state$?: Observable<WordList>;
  current_word_list?: WordList

  game_selector = false

  land1_valid = true
  land2_valid = true


  land_list: land[] = []
  word_list: WordItem[] = []

  list_is_made = false
  list_loading = true

  view_list = true;


  list_info = new FormGroup({
    "list_name": new FormControl("", [Validators.required]),
    "description": new FormControl("", [])
  })

  new_word = new FormGroup({
    "word": new FormControl("", [Validators.required]),
    "translation": new FormControl("", [Validators.required])
  })

  constructor(private listService: ListService, private activatedRoute: ActivatedRoute, private wordS: wordService, private change: ChangeDetectorRef, private router: Router, private game: GameService) {
    this.list_state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state))
    lands.map(data => this.land_list.push({ "key": data[0], "name": data[1] }))
  }

  ngOnDestroy(): void {
    this.wordS.clear_list()
  }

  ngOnInit(): void {
    this.wordS.data_in.subscribe(b => this.list_loading = !b)
    this.wordS.word_list.subscribe(data => {
      this.word_list = data
      this.change.detectChanges()
    })
  }

  ngAfterViewInit(): void {
    this.list_state$?.subscribe(land => {
      if ("id" in window.history.state) {
        this.view_list = true
        this.set_existing_list(land)
      } else {
        this.list_loading = false
      }
    })
  }

  open_game_selector() {
    this.game_selector = !this.game_selector
  }

  switch_edit_mode() {
    this.view_list = !this.view_list
  }

  go_to_test(game: AvailableGames) {
    if (this.word_list.length > 0 && this.current_word_list && this.word_list) {
      this.game.set_words_items(this.word_list)
      this.game.set_word_list(this.current_word_list)
      this.game.start_game(game)
    }
  }


  set_existing_list(word_list: WordList) {
    this.current_word_list = word_list
    this.wordS.get_words(word_list.id)
    this.list_is_made = true;
    this.list_info.get("list_name")?.setValue(word_list.name)
    this.list_info.get("description")?.setValue(word_list.description)
    this.set_land1_by_key.next(word_list.from_language)
    this.set_land2_by_key.next(word_list.to_language)

    this.fill_land(this.land1, word_list.from_language)
    this.fill_land(this.land2, word_list.to_language)
  }

  fill_land(land: land, land_key: string) {
    this.land_list.map(e => {
      if (e.key == land_key.toLowerCase()) {
        land.key = land_key
        land.name = e.name
      }
    })
  }

  add_new_word() {
    if (this.new_word.invalid) this.new_word.markAllAsTouched()

    const word = this.new_word.get("word")?.value
    const translation = this.new_word.get("translation")?.value
    if (this.new_word.valid && word && translation && this.current_word_list?.id) {
      this.wordS.add_word(word, translation, this.current_word_list.id)
      this.new_word.get("word")?.setValue("")
      this.new_word.get("translation")?.setValue("")
      this.new_word.markAsUntouched()
      this.word_input?.nativeElement.focus()
    }
  }

  save_or_update_list_info() {
    this.land1_valid = true
    this.land2_valid = true

    if (this.land1.name === '') this.land1_valid = false
    if (this.land2.name === '') this.land2_valid = false

    if (this.list_info.invalid) this.list_info.markAllAsTouched()

    const list_name = this.list_info.get("list_name")?.value
    const description = this.list_info.get("description")?.value
    if (this.list_info.valid && this.land1_valid && this.land2_valid && list_name) {

      const new_word_list: make_WordList = {
        name: list_name,
        description: description ? description : "",
        from_language: this.land1.key.toUpperCase(),
        to_language: this.land2.key.toUpperCase()
      }

      if (this.list_is_made && this.current_word_list) {
        this.listService.update_list(new_word_list, this.current_word_list?.id)
        this.current_word_list.name = new_word_list.name
        this.current_word_list.description = new_word_list.description
        this.switch_edit_mode()

      } else {

        this.listService.make_list(new_word_list).subscribe((data) => {
          if (data) {
            this.current_word_list = data
            this.list_is_made = true
            this.change.detectChanges()
          }
        })
      }
    }
  }

  delete_list() {
    if (this.list_is_made && this.current_word_list) {
      this.listService.delete_list(this.current_word_list.id).subscribe(data => {
        this.router.navigate(["/home"])
      })
    } else {
      this.router.navigate(["/home"])
    }
  }

  switch_lands() {
    this.set_land2.next(this.land1)
    this.set_land1.next(this.land2)
    const temp_land = this.land1;
    this.land1 = this.land2;
    this.land2 = temp_land;
  }

  dropdown1_index(land: land) {
    this.land1 = land
  }


  dropdown2_index(land: land) {
    this.land2 = land
  }
}
