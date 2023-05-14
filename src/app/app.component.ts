import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule, TranslateService} from "@ngx-translate/core";


@Component({
  imports: [
    RouterOutlet,
    HttpClientModule,
    TranslateModule
  ],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    console.log(navigator.language)
    if(navigator.language == 'en'){
      this.translate.setDefaultLang('en');
    }else{
      this.translate.setDefaultLang('es');
    }
  }
}
