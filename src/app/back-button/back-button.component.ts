import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'back-button',
  standalone: true,
    imports: [CommonModule, TranslateModule],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
