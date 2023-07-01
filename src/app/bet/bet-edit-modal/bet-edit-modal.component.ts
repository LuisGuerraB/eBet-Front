import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BetListItemComponent} from "../bet-list/bet-list-item/bet-list-item.component";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Bet} from "../../../model/bet";
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormErrorMessagesComponent} from "../../form-error-messages/form-error-messages.component";
import {SessionStorageService} from "../../../service/session-storage.service";

@Component({
  selector: 'app-bet-edit-modal',
  standalone: true,
  imports: [CommonModule, BetListItemComponent, TranslateModule, ReactiveFormsModule, FormErrorMessagesComponent, MatDialogModule],
  templateUrl: './bet-edit-modal.component.html',
  styleUrls: ['./bet-edit-modal.component.scss']
})
export class BetEditModalComponent {

  bet: Bet;
  form: FormGroup;
  amount: FormControl;

  constructor(public dialogRef: MatDialogRef<BetEditModalComponent>, private sessionStorage: SessionStorageService, @Inject(MAT_DIALOG_DATA) public data: Bet) {
    const user = this.sessionStorage.getItem('user');
    this.bet = data;
    this.amount = new FormControl(this.bet.amount, [Validators.required, Validators.min(1), Validators.max(user.balance + this.bet.amount)]);
    this.form = new FormGroup({
      amount: this.amount
    })
  }

  submitForm() {
    if (this.form.valid) {
      this.bet.amount = this.amount.value;
      this.dialogRef.close(this.bet);
    }
  }

  onCancel() {
    this.dialogRef.close(this.bet);
  }

  deleteBet() {
    this.bet.id = -1;
    this.dialogRef.close(this.bet);
  }
}
