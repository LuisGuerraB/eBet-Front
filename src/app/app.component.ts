import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";
import {OverlayContainer} from '@angular/cdk/overlay';


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

  constructor(private translate: TranslateService, private overlayContainer: OverlayContainer) {
    this.overlayContainer.getContainerElement().classList.add('my-theme');
    if(navigator.language == 'es'){
      this.translate.setDefaultLang('es');
    }else{
      this.translate.setDefaultLang('en');
    }
  }
}
