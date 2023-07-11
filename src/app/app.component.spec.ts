import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {importProvidersFrom} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, AppComponent,TranslateModule],
    providers: [importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }))]
}));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
