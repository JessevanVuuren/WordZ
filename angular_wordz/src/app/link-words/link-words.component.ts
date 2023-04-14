import { Component } from '@angular/core';
import { WordList } from 'src/models/WordList.model';
import { WordItem } from 'src/models/wordItem.model';
import { OptionsService } from 'src/service/options.service';

@Component({
  selector: 'app-link-words',
  templateUrl: './link-words.component.html',
  styleUrls: ['./link-words.component.scss']
})
export class LinkWordsComponent {

  current_word_list?: WordList
  word_item: WordItem[] = []
  display_words: string[][] = []
  correct_words: string[] = []
  wrong_words: string[] = []

  one_word_selected = ""



  constructor(private options: OptionsService) {
    this.current_word_list = this.options.current_word_list
    this.word_item = this.options.word_list
    this.make_display_words()
  }

  on_click_word(word: string, index: number) {

    if (this.one_word_selected === "") {
      this.one_word_selected = word
      return
    }

    let wrong_flag = true
    this.word_item.map(item => {
      if (item.word === word) {
        if (item.translation === this.one_word_selected) {
          wrong_flag = false
          this.correct_words.push(word)
          this.correct_words.push(this.one_word_selected)
        }
      }
      if (item.translation === word) {
        if (item.word === this.one_word_selected) {
          wrong_flag = false
          this.correct_words.push(word)
          this.correct_words.push(this.one_word_selected)
        }
      }
    })
    this.wrong_words.push(word)
    this.wrong_words.push(this.one_word_selected)
    this.one_word_selected = ""
  }

  set_answer_class(word: string): string {
    if (this.correct_words.includes(word)) return "good_word"
    if (this.wrong_words.includes(word)) return "bad_word"
    if (this.one_word_selected === word) return "selected_word"
    return "none_word"
  }

  make_display_words() {
    let word_word = []
    let word_translation = []

    const random_list = this.shuffle_array(this.word_item)
    for (let i = 0; i < 5; i++) {
      const element = random_list[i]
      word_word.push(element.word)
      word_translation.push(element.translation)
      this.word_item.slice(i, 1)
    }

    word_word = this.shuffle_array(word_word)
    word_translation = this.shuffle_array(word_translation)

    for (let i = 0; i < 5; i++) {
      const element1 = word_word[i];
      const element2 = word_translation[i];
      this.display_words.push([element1, element2])
    }

  }

  shuffle_array<T>(array: T[]): T[] {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }
}
