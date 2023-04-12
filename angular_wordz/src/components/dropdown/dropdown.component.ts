import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { land } from 'src/models/land.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit{
  @Input("land_list") land_list:land[] = []
  @Input("set_land") set_land?: Observable<land>;
  @Input("set_land_by_key") set_land_by_key?: Observable<string>;
  @Output("selected") set_selected: EventEmitter<land> = new EventEmitter()
  dropdown1 = false
  search = ""

  land_key = ""
  language = "Language"


  ngOnInit() {
    this.set_land?.subscribe(land => {
      this.land_key = land.key
      this.language = land.name
    })

    this.set_land_by_key?.subscribe(key => {
      this.land_list.map(e => {
        if (e.key.toLowerCase() == key.toLowerCase()) {
          this.land_key = key
          this.language = e.name
        }
      })
    })
  }

  searchEvent(event: any) {
    this.search = event.target.value
  }

  

  close() {
    this.dropdown1 = false
    this.search = ""
  }

  select_land(land_key:land) {
    this.dropdown1 = false
    this.search = ""
    this.land_key = land_key.key
    this.language = land_key.name
    this.set_selected.next(land_key);
  }
}
