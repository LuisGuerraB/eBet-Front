import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetCreateComponent } from './bet-create.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('BetComponent', () => {
  let component: BetCreateComponent;
  let fixture: ComponentFixture<BetCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [BetCreateComponent,RouterTestingModule],
      providers: [importProvidersFrom(MatDialogModule,HttpClientModule,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }))]
});
    fixture = TestBed.createComponent(BetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
