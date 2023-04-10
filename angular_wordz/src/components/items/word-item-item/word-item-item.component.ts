import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WordItem } from 'src/models/wordItem.model';
import { wordService } from 'src/service/word.service';

@Component({
  selector: 'app-word-item-item',
  templateUrl: './word-item-item.component.html',
  styleUrls: ['./word-item-item.component.scss']
})
export class WordItemItemComponent {
  @ViewChild("wordInput") word_input?: ElementRef

  @Input("word_list_id") word_list_id?: number
  @Input("word") word?: WordItem
  @Input("index") index = 0
  is_edit_word = false;

  edit_word_form = new FormGroup({
    "word": new FormControl("", [Validators.required]),
    "translation": new FormControl("", [Validators.required]),
  })

  constructor(private wordS: wordService) { }

  del_word() {
    if (this.word?.id) {
      this.wordS.delete_word(this.word?.id)
    }
  }

  edit_word() {
    if (this.word) {
      this.edit_word_form.get("word")?.setValue(this.word?.word)
      this.edit_word_form.get("translation")?.setValue(this.word?.translation)

      this.word_input?.nativeElement.focus()
      this.is_edit_word = true;

    }
  }

  save_word() {
    if (this.edit_word_form.invalid) this.edit_word_form.markAllAsTouched()

    const word = this.edit_word_form.get("word")?.value
    const translation = this.edit_word_form.get("translation")?.value
    if (this.edit_word_form.valid && word && translation && this.word_list_id && this.word ) {

      this.wordS.update_word(word, translation, this.word.id, this.word_list_id)
      this.is_edit_word = false;
    }

  }
}
