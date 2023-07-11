import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeAttributeModalComponent} from './change-attribute-modal.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('ChangeAttributeModalComponent', () => {
  let component: ChangeAttributeModalComponent;
  let fixture: ComponentFixture<ChangeAttributeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangeAttributeModalComponent],
      providers: [importProvidersFrom(MatDialogModule,HttpClientModule,TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      })),
              {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {message:'message', attribute:'password', repeat: true}}
]
    });
    fixture = TestBed.createComponent(ChangeAttributeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
