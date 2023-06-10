import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {BackButtonComponent} from "../back-button/back-button.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  message: string = '';

  constructor(private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      let error = params['error'];
      switch (error) {
        case '404':
          this.message = 'page-not-found';
          break;
        case '401':
          this.message = 'no-privilege-for-page'
          break;
      }
    })
  }
}
