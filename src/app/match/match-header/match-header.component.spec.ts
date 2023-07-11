import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchHeaderComponent } from './match-header.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {matchMock} from "../../../mocks/mock";

describe('MatchHeaderComponent', () => {
  let component: MatchHeaderComponent;
  let fixture: ComponentFixture<MatchHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatchHeaderComponent],
      providers: [importProvidersFrom(HttpClientModule,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }))]
    });
    fixture = TestBed.createComponent(MatchHeaderComponent);
    component = fixture.componentInstance;
    component.match = matchMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
