import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BetService} from "../../../service/bet.service";
import {Bet} from "../../../model/bet";
import {TranslateModule} from "@ngx-translate/core";
import {BackButtonComponent} from "../../back-button/back-button.component";
import {BetListItemComponent} from "./bet-list-item/bet-list-item.component";
import {SpinnerComponent} from "../../spinner/spinner.component";
import {MatDialog} from "@angular/material/dialog";
import {BetEditModalComponent} from "../bet-edit-modal/bet-edit-modal.component";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {SessionStorageService} from "../../../service/session-storage.service";

@Component({
  selector: 'app-bet-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, BackButtonComponent, BetListItemComponent, SpinnerComponent],
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements OnInit {

  betsArray?: [string, Bet[]][];
  loading = true;

  constructor(private betService: BetService, private cdr: ChangeDetectorRef, private dialog: MatDialog, private sessionStorage: SessionStorageService) {
  }

  ngOnInit() {
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

  editBet($event: Bet) {
    this.dialog.open(BetEditModalComponent, {
      data: {...$event}
    }).afterClosed().subscribe((newBet: Bet) => {
      if (newBet.id == -1) {
        //Delete it
        this.dialog.open(ConfirmationModalComponent, {
          disableClose: true,
          data: {
            message: 'sure-detele-bet',
            cancel: true
          }
        }).afterClosed().subscribe((confirmation) => {
          if (confirmation) {
            this.betService.deleteBet($event.id!).subscribe(() => {
                this.dialog.open(ConfirmationModalComponent, {
                  data: {
                    message: 'bet-deleted-successfully'
                  }
                }).afterClosed().subscribe(() => {
                  const user = this.sessionStorage.getItem('user');
                  user.balance += $event.amount
                  this.sessionStorage.setItem('user', user);
                  this.ngOnInit()
                })
              },
              () => {
                this.dialog.open(ConfirmationModalComponent, {
                  data: {
                    message: 'bet-deleted-unsuccessfully'
                  }
                })
              })
          }
        })
      } else if ($event.amount != newBet.amount) {
        //Update it
        this.betService.updateBetAmount($event.id!, newBet.amount).subscribe(() => {
            this.dialog.open(ConfirmationModalComponent, {
              data: {
                message: 'bet-updated-successfully'
              }
            }).afterClosed().subscribe(() => {
              const amountDiference = $event.amount - newBet.amount
              const user = this.sessionStorage.getItem('user');
              user.balance += amountDiference
              this.sessionStorage.setItem('user', user);
              this.ngOnInit()
            })
          },
          () => {
            this.dialog.open(ConfirmationModalComponent, {
              data: {
                message: 'bet-updated-unsuccessfully'
              }
            })
          })
      }
    })
  }
}
