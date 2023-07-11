import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormErrorMessagesComponent} from "../../../form-error-messages/form-error-messages.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../service/auth.service";

@Component({
  selector: 'app-change-img-modal',
  standalone: true,
  imports: [CommonModule, FormErrorMessagesComponent, FormsModule, ReactiveFormsModule, TranslateModule, MatDialogModule],
  templateUrl: './change-img-modal.component.html',
  styleUrls: ['./change-img-modal.component.scss']
})
export class ChangeImgModalComponent {
  form: FormGroup;
  img = new FormControl();
  imageData: any;
  imagePreview: any;

  constructor(public dialogRef: MatDialogRef<ChangeImgModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private authService : AuthService) {
    this.form = new FormGroup({
      img: this.img
    })
    this.imagePreview = data.img;
  }

  onFileSelected($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.imageData = file;
      const img = new Image();
      let width = 0;
      let height = 1;
      img.onload = () => {
        if (file.size < 1048576) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imagePreview = (e.target as FileReader).result;
          };
          reader.readAsDataURL(file);
        } else {
          this.img.setValue(undefined);
          this.img.setErrors({ 'max-size-reached': true });
          this.imagePreview = null;
        }
      };
      img.src = URL.createObjectURL(file);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAccept() {
    if (this.form.valid) {
      this.authService.updateUserImg(this.imageData).subscribe(
        () => {
          this.dialogRef.close(true);
        },()=>{
          this.dialogRef.close(false);
        }
      )
    }
  }
}
