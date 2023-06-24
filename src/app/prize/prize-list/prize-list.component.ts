import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  prizes? : Prize[]

  constructor(private prizeService : PrizeService, private authService : AuthService, private apiService : ApiService,private dialog: MatDialog){}

  ngOnInit(){
    this.prizeService.getPrizes().subscribe(
      (prizes) => {
        this.prizes = prizes.items;
        this.loading = false;
      }
    )
    this.authService.getPrivileges().subscribe(
      (privileges) => {
        if (privileges.privileges.indexOf('marketing')){
          this.privileges=true;
        }
      }
    )
  }

  deletePrize(prize_id:number) {
    this.dialog.open(ConfirmationModalComponent,{
      disableClose:true,
      data:{
        message:'sure-delete-prize',
         cancel:true
      }
    }).afterClosed().subscribe(
      confirmation => {
        if(confirmation){
        }
        this.prizeService.deletePrize(prize_id).subscribe(
          () => {
            this.dialog.open(ConfirmationModalComponent,{
              data:{
                message: 'prize-delete-successfully'
              }
            }).afterClosed().subscribe(
              () =>{
                this.ngOnInit()
              }
            )
         }
        )
      }
    )
  }
}
