import { AfterViewInit, Component, Input } from '@angular/core';
import { WordItem } from 'src/models/wordItem.model';

@Component({
  selector: 'app-word-item-item',
  templateUrl: './word-item-item.component.html',
  styleUrls: ['./word-item-item.component.scss']
})
export class WordItemItemComponent {
  @Input("word") word?:WordItem
  @Input("index") index = 0

}
