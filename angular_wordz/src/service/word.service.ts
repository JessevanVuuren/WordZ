import { WordItem } from "src/models/wordItem.model"
import { BehaviorSubject, Observable, Subject } from "rxjs"
import { HttpService } from "./http.service"
import { Injectable } from "@angular/core"

@Injectable({ providedIn: 'root' })
export class wordService {
  word_list = new BehaviorSubject<WordItem[]>([]);
  data_in = new BehaviorSubject<boolean>(false);
  temp_random_id_list: Array<number> = []

  constructor(private http: HttpService) { }


  get_words(word_list_id: number) {
    this.http.getData<WordItem>("/api/word_item/" + word_list_id).subscribe(data => {
      this.data_in.next(true)
      this.word_list.next(data)
    })
  }

  clear_list() {
    this.data_in.next(false)
    this.word_list.next([])
  }

  delete_word(word_id: number) {
    if (this.temp_random_id_list.includes(word_id)) return
    const list = this.word_list.getValue()
    const updated_list = list.filter(item => item.id !== word_id)
    this.word_list.next(updated_list)
    this.http.deleteData("/api/word_item/" + word_id).subscribe()
  }

  add_word(word: string, translation: string, word_list_id: number) {
    const random_id = Math.floor(100000000 + Math.random() * 900000000)
    this.temp_random_id_list.push(random_id)
    const wordItem: WordItem = {
      "translation": translation,
      "word": word,
      "word_list_id": word_list_id,
      "created_at": "",
      "id": random_id,
      "updated_at": ""
    }

    const list = this.word_list.getValue()
    list.push(wordItem)
    this.word_list.next(list)

    this.http.sendData<WordItem>("/api/word_item", {
      "word_list_id": word_list_id,
      "word": word,
      "translation": translation
    }).subscribe(data => {

      const list = this.word_list.getValue()
      const index = list.findIndex(item => item.id === random_id)
      list[index] = data
      this.word_list.next(list)
    })
  }

  update_word(word: string, translation: string, word_id: number, word_list_id: number) {

    const list = this.word_list.getValue()
    const index = list.findIndex(item => item.id === word_id)
    list[index].word = word
    list[index].translation = translation
    this.word_list.next(list)

    this.http.updateData<WordItem>("/api/word_item/" + word_id, {
      "word": word,
      "translation": translation,
      "word_list_id": word_list_id
    }).subscribe()
  }
}