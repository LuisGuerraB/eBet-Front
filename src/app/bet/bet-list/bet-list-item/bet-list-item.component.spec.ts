import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetListItemComponent } from './bet-list-item.component';
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Bet} from "../../../../model/bet";
import {PlayMatch} from "../../../../model/play";
import {Match} from "../../../../model/match";
import {Tournament} from "../../../../model/tournament";
import {League} from "../../../../model/league";
import {betMock} from "../../../../mocks/mock";

describe('BetListItemComponent', () => {
  let component: BetListItemComponent;
  let fixture: ComponentFixture<BetListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BetListItemComponent],
      providers: [importProvidersFrom(HttpClientModule,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }))]
    });
    fixture = TestBed.createComponent(BetListItemComponent);
    component = fixture.componentInstance;
    component.bet = betMock;
    fixture.detectChanges();
  });

  it('should create the component with a bet', () => {

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.bet).toEqual(betMock);
  });
});
