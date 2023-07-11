import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BetEditModalComponent} from './bet-edit-modal.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {betMock} from "../../../mocks/mock";

describe('BetEditModalComponent', () => {
  let component: BetEditModalComponent;
  let fixture: ComponentFixture<BetEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BetEditModalComponent, MatDialogModule],
      providers: [importProvidersFrom(HttpClientModule,TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      })),
        {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {betMock}}
      ]
    });
    fixture = TestBed.createComponent(BetEditModalComponent);
    component = fixture.componentInstance;
    component.bet = betMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
