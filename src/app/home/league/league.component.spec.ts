import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueComponent } from './league.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {RouterTestingModule} from "@angular/router/testing";

describe('LeagueComponent', () => {
  let component: LeagueComponent;
  let fixture: ComponentFixture<LeagueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LeagueComponent,RouterTestingModule],
      providers: [importProvidersFrom(HttpClientModule ,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }))]
    });
    fixture = TestBed.createComponent(LeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
