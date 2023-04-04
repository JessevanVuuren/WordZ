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

  make_list(new_word_list:make_WordList):Observable<WordList> {
    return this.http.sendData<WordList>("/api/word_list", new_word_list)
  }

  get_word_list_by_id(id:number) {
    return this.http.getSingleData<WordList>("/api/word_list/" + id)
  }
}