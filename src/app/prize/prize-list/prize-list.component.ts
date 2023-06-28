import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from "../../spinner/spinner.component";
import {BackButtonComponent} from "../../back-button/back-button.component";
import {PrizeItemComponent} from "./prize-item/prize-item.component";
import {TranslateModule} from "@ngx-translate/core";
import {PrizeService} from "../../../service/prize.service";
import {Prize} from "../../../model/prize";
import {AuthService} from "../../../service/auth.service";
import {ApiService} from "../../../service/api.service";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {SessionStorageService} from "../../../service/session-storage.service";
import {PrizeBuyModalComponent} from "../prize-buy-modal/prize-buy-modal.component";

@Component({
  selector: 'app-prize-list',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, BackButtonComponent, PrizeItemComponent, TranslateModule],
  templateUrl: './prize-list.component.html',
  styleUrls: ['./prize-list.component.scss']
})
export class PrizeListComponent {

  loading = true;
  privileges = false;
  backEnd = '';
  prizes: Prize[] = [];
  viewPrizes: Prize[] = [];
  buyable = false;

  constructor(private prizeService: PrizeService, private authService: AuthService, private apiService: ApiService, private dialog: MatDialog, private sessionStorage: SessionStorageService) {
  }

  ngOnInit(){
    this.backEnd = this.apiService.getBackEndUrl()
    this.prizeService.getPrizes().subscribe(
      (prizes) => {
        this.prizes = prizes.items;
        this.viewPrizes = [...prizes.items];
        this.loading = false;
      }
    )
    this.authService.getPrivileges().subscribe(
      (privileges) => {
        if (privileges.privileges.indexOf('marketing')) {
          this.privileges = true;
        }
      }
    )
  }

  deletePrize(prize_id: number) {
    this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      data: {
        message: 'sure-delete-prize',
        cancel: true
      }
    }).afterClosed().subscribe(
      confirmation => {
        if (confirmation) {
        }
        this.prizeService.deletePrize(prize_id).subscribe(
          () => {
            this.dialog.open(ConfirmationModalComponent, {
              data: {
                message: 'prize-delete-successfully'
              }
            }).afterClosed().subscribe(
              () => {
                this.ngOnInit()
              }
            )
          }
        )
      }
    )
  }

  applyFilter() {
    this.buyable = !this.buyable
    if (this.buyable) {
      this.viewPrizes = this.prizes.filter(prize => prize.price <= this.sessionStorage.getItem('user').balance);
    } else {
      this.viewPrizes = [...this.prizes];
    }
  }

  buyPrize($event: Prize) {
    if ($event.price <= this.sessionStorage.getItem('user').balance) {
      this.dialog.open(ConfirmationModalComponent, {
        data: {
          message: 'sure-buy-prize',
          //add prize name
          cancel: true
        }
      }).afterClosed().subscribe(
        confirmation => {
          if (confirmation) {
            this.dialog.open(PrizeBuyModalComponent).afterClosed().subscribe(
              (data) => {
                if (data) {
                  this.prizeService.buyPrize($event, data.email).subscribe(
                    () => {
                      this.dialog.open(ConfirmationModalComponent, {
                        data: {
                          message: 'prize-buy-successfully'
                        }
                      }).afterClosed().subscribe(
                        () => {
                          this.ngOnInit()
                        }
                      )
                    })
                }
              })
          }
        })
    } else {
      this.dialog.open(ConfirmationModalComponent, {
        data: {
          message: 'balance-not-enough'
        }
      })
    }
  }
}
