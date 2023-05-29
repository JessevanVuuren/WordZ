import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WordList } from 'src/models/WordList.model';
import { WordItem } from 'src/models/wordItem.model';
import { GameService } from 'src/service/game.service';

@Component({
  selector: 'app-spelling',
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.scss']
})
export class SpellingComponent {

  current_word_list?: WordList
  word_items: WordItem[] = []
  current_word?: WordItem
  start_int = 0
  give_hint_length = 0

  input_value = ""

  correct_words_list: WordItem[] = []
  incorrect_words_list: WordItem[] = []


  constructor(private game: GameService, private router: Router) {
    this.current_word_list = this.game.current_word_list
    this.word_items = this.game.shuffle_array(this.game.word_list)
    this.current_word = this.word_items[this.start_int]
  }

  check_word() {
    // if (this.current_word) {
    //   this.next_word()
    //   this.correct_words_list.push(this.current_word)
    // }


    if (this.current_word && this.input_value) {
      
      if (this.current_word.translation.toLocaleLowerCase() === this.input_value.toLocaleLowerCase()) {
        this.correct_words_list.push(this.current_word)
        this.next_word()
      }
      else {
        this.incorrect_words_list.push(this.current_word)
        this.next_word()

      }
    }
  }

  next_word() {
    this.give_hint_length = 0
    this.input_value = ""
    this.start_int += 1
    if (this.start_int >= this.word_items.length) {
      this.go_to_score_screen()
      return
    }
    this.current_word = this.word_items[this.start_int]
  }

  go_to_score_screen() {
    this.game.set_game_score(this.correct_words_list, this.incorrect_words_list)
    this.router.navigate(["/score"])
  }

  give_hint() {
    if (!this.current_word) return
    const translation = this.current_word.translation
    this.give_hint_length += 1
    this.input_value = translation.substring(0, this.give_hint_length)
  }
}
