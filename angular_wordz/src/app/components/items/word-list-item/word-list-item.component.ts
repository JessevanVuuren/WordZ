import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WordList } from 'src/models/WordList.model';

@Component({
  selector: 'app-word-list-item',
  templateUrl: './word-list-item.component.html',
  styleUrls: ['./word-list-item.component.scss']
})
export class WordListItemComponent {
  @Input("item") item?:WordList;

  constructor(private route:Router) {

  }

  to_list() {
    this.route.navigate(['/create'], { state: this.item });
  }
}
