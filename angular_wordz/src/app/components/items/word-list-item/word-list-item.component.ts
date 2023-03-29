import { Component, Input } from '@angular/core';
import { WordList } from 'src/models/WordList.model';

@Component({
  selector: 'app-word-list-item',
  templateUrl: './word-list-item.component.html',
  styleUrls: ['./word-list-item.component.scss']
})
export class WordListItemComponent {
  @Input("item") item?:WordList;
}
