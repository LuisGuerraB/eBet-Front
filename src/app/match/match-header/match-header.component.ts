import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Match} from "../../../model/match";
import {SpinnerComponent} from "../../spinner/spinner.component";

@Component({
  selector: 'app-match-header',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './match-header.component.html',
  styleUrls: ['./match-header.component.scss']
})
export class MatchHeaderComponent {
  @Input() match: Match | undefined;

}
