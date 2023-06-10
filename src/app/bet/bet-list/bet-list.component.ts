import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BetService} from "../../../service/bet.service";
import {Bet} from "../../../model/bet";
import {TranslateModule} from "@ngx-translate/core";
import {BackButtonComponent} from "../../back-button/back-button.component";
import {BetListItemComponent} from "./bet-list-item/bet-list-item.component";
import {SpinnerComponent} from "../../spinner/spinner.component";

@Component({
  selector: 'app-bet-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, BackButtonComponent, BetListItemComponent, SpinnerComponent],
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements AfterViewInit {

  betsArray?: [string, Bet[]][];
  loading=true;

  constructor(private betService: BetService,private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.betService.getBets().subscribe(bets => {
      const bet_items = bets.items;
      const betsMap = new Map<string, Bet[]>();
      bet_items.forEach((obj) => {
        const date = new Date(obj.date).toLocaleDateString(navigator.language, {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        });
        const formattedDate = date.replace(/\//g, ' - '); // Replace slashes with dashes
        if (betsMap!.has(formattedDate)) {
          betsMap!.get(formattedDate)!.push(obj);
        } else {
          betsMap!.set(formattedDate, [obj]);
        }

      })
      this.loading = false;
      this.betsArray = Array.from(betsMap.entries());
      this.cdr.detectChanges();
    });
  }

}
