import { WordList } from "src/models/WordList.model";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { WordItem } from "src/models/wordItem.model";

@Injectable({ providedIn: 'root' })
export class wordService {
  word_list = new BehaviorSubject<WordList[]>([]);


  constructor(private http:HttpService) {}


  get_words(word_list_id:number): Observable<WordItem[]> {
    return this.http.getData<WordItem>("/api/word_item/" + word_list_id)
  }
}