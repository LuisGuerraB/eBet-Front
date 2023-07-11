import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultComponent } from './match-result.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {RouterTestingModule} from "@angular/router/testing";

describe('MatchResultComponent', () => {
  let component: MatchResultComponent;
  let fixture: ComponentFixture<MatchResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatchResultComponent,RouterTestingModule],
      providers: [importProvidersFrom(HttpClientModule,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }))]
    });
    fixture = TestBed.createComponent(MatchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
