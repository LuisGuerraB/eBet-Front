import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeItemComponent } from './prize-item.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

describe('PrizeItemComponent', () => {
  let component: PrizeItemComponent;
  let fixture: ComponentFixture<PrizeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrizeItemComponent],
      providers: [importProvidersFrom(HttpClientModule,TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      }))]
    });
    fixture = TestBed.createComponent(PrizeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
