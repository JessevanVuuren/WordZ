import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { make_WordList } from 'src/models/make_wordList.model';
import { ActivatedRoute, Router } from '@angular/router';
import { wordService } from 'src/service/word.service';
import { ListService } from 'src/service/list.service';
import { WordItem } from 'src/models/wordItem.model';
import { WordList } from 'src/models/WordList.model';
import { Observable, Subject, map } from 'rxjs';
import { land } from 'src/models/land.model';
import { lands } from 'src/assets/lands';

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

  set_land1: Subject<land> = new Subject<land>()
  set_land2: Subject<land> = new Subject<land>()

  list_state$?: Observable<WordList>;
  current_word_list?: WordList

  land1: land = { key: "", name: "" }
  land2: land = { key: "", name: "" }

  land1_valid = true
  land2_valid = true


  land_list: land[] = []
  word_list: WordItem[] = []

  list_is_made = false;


  list_info = new FormGroup({
    "list_name": new FormControl("", [Validators.required]),
    "description": new FormControl("", [])
  })

  new_word = new FormGroup({
    "word": new FormControl("", [Validators.required]),
    "translation": new FormControl("", [Validators.required])
  })

  constructor(private listService: ListService, private activatedRoute: ActivatedRoute, private wordS: wordService, private change: ChangeDetectorRef, private router: Router) {
    this.list_state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state))
    lands.map(data => this.land_list.push({ "key": data[0], "name": data[1] }))
  }

  ngOnDestroy(): void {
    this.wordS.clear_list()
  }

  ngOnInit(): void {
    this.wordS.word_list.subscribe(data => {
      this.word_list = data
      this.change.detectChanges()
    })
  }

  ngAfterViewInit(): void {
    // const debug: WordList = { "id": 2, "user_id": 1, "name": "Test", "description": "simple test for testing", "from_language": "NL", "to_language": "NL", "created_at": "2023-03-31T18:23:48.000000Z", "updated_at": "2023-03-31T18:23:48.000000Z", "amount": 5 }
    // this.set_existing_list(debug)

    this.list_state$?.subscribe(land => {
      if ("id" in window.history.state) {
        this.set_existing_list(land)
      }
    })
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
      } else {

        this.listService.make_list(new_word_list).subscribe((data) => {
          if (data) {
            this.current_word_list = data
            this.list_is_made = true
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
