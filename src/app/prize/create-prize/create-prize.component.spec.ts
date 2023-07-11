import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePrizeComponent} from './create-prize.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatDialogModule} from "@angular/material/dialog";

describe('PrizeComponent', () => {
  let component: CreatePrizeComponent;
  let fixture: ComponentFixture<CreatePrizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreatePrizeComponent],
      providers: [importProvidersFrom(MatDialogModule,HttpClientModule,TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      }))]
    });
    fixture = TestBed.createComponent(CreatePrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
