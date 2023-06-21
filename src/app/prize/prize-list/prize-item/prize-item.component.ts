import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Prize} from "../../../../model/prize";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-prize-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './prize-item.component.html',
  styleUrls: ['./prize-item.component.scss']
})
export class PrizeItemComponent {
  @Input() prize!: Prize;
  @Input() url!: string;
}
