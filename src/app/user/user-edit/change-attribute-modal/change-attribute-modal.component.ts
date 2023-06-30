import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormErrorMessagesComponent} from "../../../auth/form-error-messages/form-error-messages.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-change-attribute-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorMessagesComponent, MatDialogModule, TranslateModule],
  templateUrl: './change-attribute-modal.component.html',
  styleUrls: ['./change-attribute-modal.component.scss']
})
export class ChangeAttributeModalComponent {

  form: FormGroup;
  message : string;
  attribute : string;
  repeat: boolean;
  constructor(public dialogRef: MatDialogRef<ChangeAttributeModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
    this.message = data.message;
    this.attribute = data.attribute;
    this.repeat = data.repeat;
    this.form = new FormGroup({
      attribute: new FormControl('', [Validators.required])
    })
    if(this.attribute == 'email'){
      this.form.controls['attribute'].setValidators(Validators.email);
    }
  }

  submitForm(){
    if (this.form.valid) {
      this.dialogRef.close(this.form.controls['attribute'].value);
    }else{
      this.dialogRef.close(false);
    }
  }
}
