import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";


@Component({
  imports: [
    RouterOutlet,
    HttpClientModule,
    TranslateModule,
    MatDialogModule
  ],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    if(navigator.language == 'en'){
      this.translate.setDefaultLang('en');
    }else{
      this.translate.setDefaultLang('es');
    }
  }
}
