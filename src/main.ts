import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {AppRoutingModule} from './app/app-routing.module';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";



bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    })
  )
  ]
})
  .catch(err => console.error(err));
