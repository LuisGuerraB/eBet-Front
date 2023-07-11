import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BetModalComponent} from './bet-modal.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {betMock} from "../../../mocks/mock";

describe('BetmodalComponent', () => {
  let component: BetModalComponent;
  let fixture: ComponentFixture<BetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BetModalComponent],
      providers: [importProvidersFrom(HttpClientModule,MatDialogModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      })),
        {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {betMock}}
      ]
    });
    fixture = TestBed.createComponent(BetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
