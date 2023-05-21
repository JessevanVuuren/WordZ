import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss']
})
export class BackArrowComponent {

  constructor(private location:Location) {}

  nav_back() {
    this.location.back()
  }
}

