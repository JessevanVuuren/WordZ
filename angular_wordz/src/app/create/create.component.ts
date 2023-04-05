import { FormControl, FormGroup, Validators } from '@angular/forms';
import { make_WordList } from 'src/models/make_wordList.model';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ListService } from 'src/service/list.service';
import { WordItem } from 'src/models/wordItem.model';
import { WordList } from 'src/models/WordList.model';
import { land } from 'src/models/land.model';
import { lands } from 'src/assets/lands';
import { Observable, Subject, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { wordService } from 'src/service/word.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, AfterViewInit {
  set_land1_by_key: Subject<string> = new Subject<string>()
  set_land2_by_key: Subject<string> = new Subject<string>()

  set_land1: Subject<land> = new Subject<land>()
  set_land2: Subject<land> = new Subject<land>()

  list_state$?:Observable<WordList>;

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

  constructor(private listService: ListService, private activatedRoute: ActivatedRoute, private wordS: wordService, private change:ChangeDetectorRef) {
    lands.map(data => this.land_list.push({ "key": data[0], "name": data[1] }))
    this.list_state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state))
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.list_state$?.subscribe(land => this.set_existing_list(land))
  }

  set_existing_list(word_list:WordList) {
    this.wordS.get_words(word_list.id).subscribe(list => {
      console.log(list)
      this.word_list = list
      this.change.detectChanges()
    })
    this.list_is_made = true;
    this.list_info.get("list_name")?.setValue(word_list.name)
    this.list_info.get("description")?.setValue(word_list.description)
    this.set_land1_by_key.next(word_list.from_language)
    this.set_land2_by_key.next(word_list.to_language)
  }

  add_new_word() {
    if (this.new_word.invalid) this.new_word.markAllAsTouched()

    const list_name = this.new_word.get("word")?.value
    const description = this.new_word.get("translation")?.value
    if (this.new_word.valid && list_name && description) {
      console.log("valid")
    }
  }

  save_list_info() {
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

      this.listService.make_list(new_word_list).subscribe((data) => {
        if (data) {
          this.list_is_made = true
        }
      })
    }
  }

  delete_list() {

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
