import {Component, Inject} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormErrorMessagesComponent} from "../../auth/form-error-messages/form-error-messages.component";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-bet-modal',
  standalone: true,
  imports: [NgIf, MatDialogModule, TranslateModule, ReactiveFormsModule, FormErrorMessagesComponent, DecimalPipe],
  templateUrl: './bet-modal.component.html',
  styleUrls: ['./bet-modal.component.scss']
})
export class BetModalComponent {

  form: FormGroup;
  amount = new FormControl(0, [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(0)
  ]);

  team : string;
  type: string;
  subtype?: number;
  odd: number;
  set: number;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      amount: this.amount
    })
    this.team = data.team;
    this.type = data.type;
    this.set = data.set;
    if (data.subtype){
      this.subtype = data.subtype;
    }
    this.odd = data.odd;
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onAccept() {
    let dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: "sure-bet",
        content: this.amount.value?.toString() + ' - eB',
        cancel:true,
      },
    })
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.dialogRef.close({
            team: this.team,
            type: this.type,
            subtype: this.subtype,
            odd: this.odd,
            amount: this.amount.value,
            set: this.set
          });
        }else{
          this.dialogRef.close(false);
        }
      }
    )

  }
}
