import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrizeBuyModalComponent} from './prize-buy-modal.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('PrizeBuyModalComponentComponent', () => {
  let component: PrizeBuyModalComponent;
  let fixture: ComponentFixture<PrizeBuyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrizeBuyModalComponent],
      providers: [importProvidersFrom(MatDialogModule, HttpClientModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      })),
        {provide: MatDialogRef, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(PrizeBuyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
