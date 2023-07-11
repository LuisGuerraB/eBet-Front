import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoreEpComponent} from './more-ep.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

describe('MoreEpComponent', () => {
  let component: MoreEpComponent;
  let fixture: ComponentFixture<MoreEpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MoreEpComponent],
      providers: [importProvidersFrom(HttpClientModule,TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      }))]
    });
    fixture = TestBed.createComponent(MoreEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
