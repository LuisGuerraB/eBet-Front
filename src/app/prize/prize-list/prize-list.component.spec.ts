import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrizeListComponent} from './prize-list.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatDialogModule} from "@angular/material/dialog";

describe('PrizeListComponent', () => {
  let component: PrizeListComponent;
  let fixture: ComponentFixture<PrizeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrizeListComponent],
      providers: [importProvidersFrom(MatDialogModule,HttpClientModule,TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      }))]
    });
    fixture = TestBed.createComponent(PrizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
