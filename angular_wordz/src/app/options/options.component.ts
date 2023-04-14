import { Component } from '@angular/core';
import { OptionsService } from 'src/service/options.service';

@Component({
  selector: 'app-Options',
  templateUrl: './Options.component.html',
  styleUrls: ['./Options.component.scss']
})
export class OptionsComponent {

constructor(private options:OptionsService) {}

}
