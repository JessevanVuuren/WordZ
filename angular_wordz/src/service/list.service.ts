import { WordList } from "src/models/WordList.model";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { make_WordList } from "src/models/make_wordList.model";

@Injectable({ providedIn: 'root' })
export class ListService {

  word_list = new BehaviorSubject<WordList[]>([]);

  constructor(private http:HttpService) {

  }

  getWordLists() {
    this.http.getData<WordList>("/api/word_list").subscribe((data) => {
      this.word_list.next(data)
    })
  }

  clear_list() {
    this.word_list.next([])
  }

  make_list(new_word_list:make_WordList):Observable<WordList> {
    this.clear_list()
    return this.http.sendData<WordList>("/api/word_list", new_word_list)
  }

  update_list(new_word_list:make_WordList, id:number) {
    this.clear_list()
    this.http.updateData<WordList>("/api/word_list/" + id, new_word_list).subscribe()
  }

  get_word_list_by_id(id:number) {
    return this.http.getSingleData<WordList>("/api/word_list/" + id)
  }

  delete_list(id:number):Observable<any> {
    this.clear_list()
    return this.http.deleteData("/api/word_list/" + id)
  }
}