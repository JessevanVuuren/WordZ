import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WordList } from 'src/models/WordList.model';
import { WordItem } from 'src/models/wordItem.model';
import { GameService } from 'src/service/game.service';

@Component({
  selector: 'app-score-screen',
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.scss']
})
export class ScoreScreenComponent {

  score = 0
  total = 0
  percent_right = 0
  percent_wrong = 0

  right_words: WordItem[] = []
  wrong_words: WordItem[] = []
  entire_words_list: WordItem[] = []
  current_word_list?: WordList

  constructor(private game: GameService, private router: Router) {
    if (this.game.correct_words.length == 0 && this.game.incorrect_words.length == 0) {
      this.router.navigate(["/"])
    }

    this.right_words = this.game.correct_words
    this.wrong_words = this.game.incorrect_words
    this.entire_words_list = this.game.word_list

    this.current_word_list = this.game.current_word_list

    this.score = this.right_words.length
    this.total = this.game.correct_words.length + this.game.incorrect_words.length
    this.percent_right = Math.round(this.right_words.length / (this.right_words.length + this.wrong_words.length) * 100)
    this.percent_wrong = Math.round(this.wrong_words.length / (this.right_words.length + this.wrong_words.length) * 100)
  }

  take_me_home() {
    this.router.navigate(["/"])
  }

  redo_entire_list() {
    if (this.current_word_list) {
      this.game.set_words_items(this.entire_words_list)
      this.game.set_word_list(this.current_word_list)
      this.game.start_game("link-words")
    }
  }

  redo_right() {
    if (this.current_word_list) {
      this.game.set_words_items(this.right_words)
      this.game.set_word_list(this.current_word_list)
      this.game.start_game("link-words")
    }
  }


  redo_wrong() {
    if (this.current_word_list) {
      this.game.set_words_items(this.wrong_words)
      this.game.set_word_list(this.current_word_list)
      this.game.start_game("link-words")
    }

  }
}
