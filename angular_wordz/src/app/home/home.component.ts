import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/AuthResponse.model';
import { WordList } from 'src/models/WordList.model';
import { AuthService } from 'src/service/auth.service';
import { ListService } from 'src/service/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  word_list:WordList[] = []
  user_model?:User


  constructor(private auth:AuthService, private wordList:ListService) {
    this.user_model = this.auth.user_model?.user

    this.wordList.word_list.subscribe(list => {
      this.word_list = list
    })

  }

  ngOnInit(): void {
    this.wordList.getWordLists()
    if (this.user_model) {
      console.log(this.user_model.name)
      
    }
  }

  add_list() {
    console.log("add list")
  }
}
