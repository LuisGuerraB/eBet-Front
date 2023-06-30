import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormErrorMessagesComponent} from "../../form-error-messages/form-error-messages.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {noMatchValidator} from "../../../functions/validations_functions";

@Component({
  selector: 'app-prize-buy-modal',
  standalone: true,
  imports: [CommonModule, FormErrorMessagesComponent, MatDialogModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './prize-buy-modal.component.html',
  styleUrls: ['./prize-buy-modal.component.scss']
})
export class PrizeBuyModalComponent {

  form: FormGroup;
  error?: string;
  email = new FormControl('', [Validators.required, Validators.email]);
  repeatEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PrizeBuyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      email: this.email,
      repeatEmail: this.repeatEmail
    },{validators :noMatchValidator('email', 'repeatEmail') });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onAccept() {
    if (this.form.valid) {
      this.dialogRef.close({
        email: this.email.value
      });
    }else{
      this.error = 'control-error.email-no-match';
    }
  }
}

