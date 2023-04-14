import { WordItem } from "src/models/wordItem.model"
import { BehaviorSubject, Observable, Subject } from "rxjs"
import { HttpService } from "./http.service"
import { Injectable } from "@angular/core"
import { WordList } from "src/models/WordList.model"

@Injectable({ providedIn: 'root' })
export class OptionsService {
  current_word_list?: WordList
  word_list: WordItem[] = []

  debugMode = true

  constructor() {
    if (this.debugMode) {
      const debug: WordList = { "id": 8, "user_id": 1, "name": "Test", "description": "simple test for testing", "from_language": "NL", "to_language": "DE", "created_at": "2023-03-31T18:23:48.000000Z", "updated_at": "2023-03-31T18:23:48.000000Z", "amount": 5 }
      this.current_word_list = debug;
      this.word_list = [
        {
          "id": 3,
          "word_list_id": 8,
          "word": "Guten Tag",
          "translation": "Good day",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 4,
          "word_list_id": 8,
          "word": "Hallo",
          "translation": "Hello",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 5,
          "word_list_id": 8,
          "word": "Auf Wiedersehen",
          "translation": "Goodbye",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 6,
          "word_list_id": 8,
          "word": "Bitte",
          "translation": "Please",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 7,
          "word_list_id": 8,
          "word": "Danke",
          "translation": "Thanks, Thank you",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 8,
          "word_list_id": 8,
          "word": "Entschuldigung",
          "translation": "Sorry",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 9,
          "word_list_id": 8,
          "word": "Gesundheit",
          "translation": "Bless you",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 10,
          "word_list_id": 8,
          "word": "Ja",
          "translation": "Yes",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 11,
          "word_list_id": 8,
          "word": "Nein",
          "translation": "No",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 12,
          "word_list_id": 8,
          "word": "Wer?",
          "translation": "Who?",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 13,
          "word_list_id": 8,
          "word": "Was?",
          "translation": "What?",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 14,
          "word_list_id": 8,
          "word": "Warum?",
          "translation": "Why?",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 15,
          "word_list_id": 8,
          "word": "Woher?",
          "translation": "Where?",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 16,
          "word_list_id": 8,
          "word": "Montag",
          "translation": "Monday",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 17,
          "word_list_id": 8,
          "word": "Dienstag",
          "translation": "Tuesday",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 18,
          "word_list_id": 8,
          "word": "Mittwoch",
          "translation": "Wednesday",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 19,
          "word_list_id": 8,
          "word": "Donnerstag",
          "translation": "Thursday",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 20,
          "word_list_id": 8,
          "word": "Freitag",
          "translation": "Friday",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 21,
          "word_list_id": 8,
          "word": "Samstag",
          "translation": "Saturday",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        },
        {
          "id": 22,
          "word_list_id": 8,
          "word": "Sonntag",
          "translation": "Sunday",
          "created_at": "2023-04-05T11:52:59.000000Z",
          "updated_at": "2023-04-05T11:52:59.000000Z"
        }
      ]
    }
  }

  clear_word_list() {
    this.current_word_list = undefined
    this.word_list = []
  }
}