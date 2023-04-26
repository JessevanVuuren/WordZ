import { Component, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WordList } from 'src/models/WordList.model';
import { WordItem } from 'src/models/wordItem.model';
import { GameService } from 'src/service/game.service';

@Component({
  selector: 'app-link-words',
  templateUrl: './link-words.component.html',
  styleUrls: ['./link-words.component.scss']
})

export class LinkWordsComponent {

  current_word_list?: WordList
  word_item_original: WordItem[] = []
  word_item_pull: WordItem[] = []
  display_words: string[][] = []
  correct_words: string[] = []
  wrong_words: string[] = []

  correct_words_list: WordItem[] = []
  incorrect_words_list: WordItem[] = []

  draw_line_elements: HTMLElement[][] = []

  one_side_selected = ""
  one_word_selected = ""
  one_elem_selected?: HTMLElement

  amount_of_words = 5

  constructor(private game: GameService, private sanitizer: DomSanitizer, private router: Router) {
    this.current_word_list = this.game.current_word_list
    this.word_item_original = this.game.word_list
    this.word_item_pull = [...this.word_item_original]
    this.make_display_words()
  }

  on_all_linked() {
    // if (this.word_item_pull.length == 0) {
    if (this.correct_words_list.length + this.incorrect_words_list.length == this.word_item_original.length) {
      setTimeout(() => {
        this.game.set_game_score(this.correct_words_list, this.incorrect_words_list)
        this.router.navigate(["/score"])
      }, 500)
    }

    if (this.draw_line_elements.length == 5) {
      setTimeout(() => {
        this.correct_words = []
        this.draw_line_elements = []
        this.display_words = []
        this.wrong_words = []
        this.one_elem_selected = undefined
        this.one_side_selected = ""
        this.one_word_selected = ""
        this.make_display_words()
      }, 500)
    }
  }

  on_click_word(word: string, word_element: HTMLElement, side: string) {



    let not_linked_yet_flag = true
    const list = [...this.correct_words, ...this.wrong_words]
    list.map(words => { if (word === words) not_linked_yet_flag = false })
    if (!not_linked_yet_flag) {
      return
    }

    if (this.one_side_selected == side) {
      this.one_word_selected = ""
    }

    this.one_side_selected = side

    if (this.one_word_selected === "") {
      this.one_word_selected = word
      this.one_elem_selected = word_element
      return
    }

    let wrong_flag = true
    this.word_item_original.map(item => {
      if (item.word === word) {
        if (item.translation === this.one_word_selected) {
          wrong_flag = false
          this.correct_words.push(word)
          this.correct_words.push(this.one_word_selected)
          this.correct_words_list.push(item)

          if (this.one_elem_selected) {
            this.draw_line_elements.push([word_element, this.one_elem_selected])
          }
        }
      }
      if (item.translation === word) {
        if (item.word === this.one_word_selected) {
          wrong_flag = false
          this.correct_words.push(word)
          this.correct_words.push(this.one_word_selected)
          this.correct_words_list.push(item)

          if (this.one_elem_selected) {
            this.draw_line_elements.push([this.one_elem_selected, word_element])
          }
        }
      }
    })
    if (wrong_flag) {
      this.wrong_words.push(word)
      this.wrong_words.push(this.one_word_selected)

      if (this.one_elem_selected) {
        let left_to_right = true
        this.word_item_original.map(item => {
          if (item.translation === word) {
            this.incorrect_words_list.push(item)
            left_to_right = false
          }
          if (item.word === word) {
            this.incorrect_words_list.push(item)
          }
        })

        if (left_to_right) this.draw_line_elements.push([word_element, this.one_elem_selected])
        if (!left_to_right) this.draw_line_elements.push([this.one_elem_selected, word_element])
      }
    }
    this.one_word_selected = ""
    this.one_elem_selected = undefined

    this.on_all_linked()
  }

  get_line_x(words: string[]) {


    if (this.draw_line_elements.length > 0) {
      let lines = ""
      for (let i = 0; i < this.draw_line_elements.length; i++) {
        const line_data = this.draw_line_elements[i];

        const x1 = line_data[0].getBoundingClientRect().x + line_data[0].getBoundingClientRect().width
        const y1 = line_data[0].getBoundingClientRect().y + line_data[0].getBoundingClientRect().height / 2

        let result_color = ""
        if (this.correct_words.includes(line_data[0].innerText)) result_color = "var(--good)"
        if (this.wrong_words.includes(line_data[0].innerText)) result_color = "var(--bad)"

        const x2 = line_data[1].getBoundingClientRect().x
        const y2 = line_data[1].getBoundingClientRect().y + line_data[1].getBoundingClientRect().height / 2

        lines += `<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="${result_color}"/>`

      }
      return this.sanitizer.bypassSecurityTrustHtml(lines);
    }

    return "";
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

    if (this.word_item_pull.length < 5) this.amount_of_words = this.word_item_pull.length % 5


    const random_list = this.shuffle_array([...this.word_item_pull])
    for (let i = 0; i < this.amount_of_words; i++) {
      const element = random_list[i]
      word_word.push(element.word)
      word_translation.push(element.translation)
      const index = this.word_item_pull.indexOf(element)
      this.word_item_pull.splice(index, 1)
    }

    word_word = this.shuffle_array(word_word)
    word_translation = this.shuffle_array(word_translation)

    for (let i = 0; i < this.amount_of_words; i++) {
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    for (let i = 0; i < this.display_words.length; i++) {
      const element = this.display_words[i];
      this.get_line_x(element)
    }
  }
}
