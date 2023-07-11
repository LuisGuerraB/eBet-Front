import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorMessagesComponent } from './form-error-messages.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AbstractControl, FormControl} from "@angular/forms";

describe('FormErrorMessagesComponent', () => {
  let component: FormErrorMessagesComponent;
  let fixture: ComponentFixture<FormErrorMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormErrorMessagesComponent],
      providers: [importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }))]
    });
    fixture = TestBed.createComponent(FormErrorMessagesComponent);
    component = fixture.componentInstance;
    component.control = new FormControl()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
