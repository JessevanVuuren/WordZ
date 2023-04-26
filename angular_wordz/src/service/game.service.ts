import { WordItem } from "src/models/wordItem.model"
import { Injectable } from "@angular/core"
import { WordList } from "src/models/WordList.model"
import { Router } from "@angular/router"

@Injectable({ providedIn: 'root' })
export class GameService {
  current_word_list?: WordList
  word_list: WordItem[] = []

  correct_words: WordItem[] = []
  incorrect_words: WordItem[] = []

  debugMode = false

  constructor(private router:Router) {
    if (this.debugMode) {
      const debug: WordList = { "id": 8, "user_id": 1, "name": "Test", "description": "simple test for testing", "from_language": "NL", "to_language": "DE", "created_at": "2023-03-31T18:23:48.000000Z", "updated_at": "2023-03-31T18:23:48.000000Z", "amount": 5 }
      this.current_word_list = debug;

      // long
      this.word_list = [
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

      const random = Math.ceil(Math.random() * this.word_list.length);
      this.correct_words = this.word_list.slice(0, random)
      this.incorrect_words = this.word_list.slice(random)


      // // short
      // this.word_list = [
      //   {
      //     "id": 6,
      //     "word_list_id": 8,
      //     "word": "Bitte",
      //     "translation": "Please",
      //     "created_at": "2023-04-05T11:52:59.000000Z",
      //     "updated_at": "2023-04-05T11:52:59.000000Z"
      //   },
      //   {
      //     "id": 7,
      //     "word_list_id": 8,
      //     "word": "Danke",
      //     "translation": "Thanks, Thank you",
      //     "created_at": "2023-04-05T11:52:59.000000Z",
      //     "updated_at": "2023-04-05T11:52:59.000000Z"
      //   },
      //   {
      //     "id": 8,
      //     "word_list_id": 8,
      //     "word": "Entschuldigung",
      //     "translation": "Sorry",
      //     "created_at": "2023-04-05T11:52:59.000000Z",
      //     "updated_at": "2023-04-05T11:52:59.000000Z"
      //   },
      //   {
      //     "id": 9,
      //     "word_list_id": 8,
      //     "word": "Gesundheit",
      //     "translation": "Bless you",
      //     "created_at": "2023-04-05T11:52:59.000000Z",
      //     "updated_at": "2023-04-05T11:52:59.000000Z"
      //   },
      //   {
      //     "id": 10,
      //     "word_list_id": 8,
      //     "word": "Ja",
      //     "translation": "Yes",
      //     "created_at": "2023-04-05T11:52:59.000000Z",
      //     "updated_at": "2023-04-05T11:52:59.000000Z"
      //   },
      //   {
      //     "id": 11,
      //     "word_list_id": 8,
      //     "word": "Nein",
      //     "translation": "No",
      //     "created_at": "2023-04-05T11:52:59.000000Z",
      //     "updated_at": "2023-04-05T11:52:59.000000Z"
      //   },
      // ]


    }
  }

  set_word_list(word_list: WordList) {
    this.current_word_list = word_list
  }

  set_words_items(word_list_list: WordItem[]) {
    this.word_list = word_list_list
  }

  start_game(game: string) {
    this.incorrect_words = []
    this.correct_words = []
    this.router.navigate(["/" + game]);
  }

  clear_word_list() {
    this.current_word_list = undefined
    this.word_list = []
  }

  set_game_score(correct_words: WordItem[], incorrect_words: WordItem[]) {
    this.correct_words = correct_words
    this.incorrect_words = incorrect_words
  }

  clear_game_score() {
    this.correct_words = []
    this.incorrect_words = []
  }
}