import {Component, Input, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-simple-bet',
  templateUrl: './simple-bet.component.html',
  styleUrls: ['./simple-bet.component.scss'],
  imports: [TranslateModule],
  standalone: true
})
export class SimpleBetComponent{
  @Input() localTeamOdd?: number;
  @Input() awayTeamOdd?: number;
  @Input() type?: string;


}
