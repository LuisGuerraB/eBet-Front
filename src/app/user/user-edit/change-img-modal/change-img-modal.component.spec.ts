import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeImgModalComponent} from './change-img-modal.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('ChangeImgModalComponent', () => {
  let component: ChangeImgModalComponent;
  let fixture: ComponentFixture<ChangeImgModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangeImgModalComponent, MatDialogModule],
      providers: [importProvidersFrom(MatDialogModule, HttpClientModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      })),
        {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {img: 'message'}}
      ]
    });
    fixture = TestBed.createComponent(ChangeImgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
