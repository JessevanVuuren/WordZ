import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  searchText = ""


  constructor(private auth:AuthService, private wordList:ListService, private route: Router) {
    this.user_model = this.auth.user_model?.user

    this.wordList.word_list.subscribe(list => {
      this.word_list = list
    })

  }

  ngOnInit(): void {
    this.wordList.getWordLists()
    if (this.user_model) {      
    }
  }

  add_list() {
    this.route.navigate(["/create"])
  }

  searchEvent(event: any) {
    this.searchText = event.target.value
  }
}
