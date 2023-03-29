import { WordList } from "src/models/WordList.model";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

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


}