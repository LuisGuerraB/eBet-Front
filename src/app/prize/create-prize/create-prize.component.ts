import {Component} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {FormErrorMessagesComponent} from "../../auth/form-error-messages/form-error-messages.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {PrizeService} from "../../../service/prize.service";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-prize',
  standalone: true,
  imports: [CommonModule, FormErrorMessagesComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './create-prize.component.html',
  styleUrls: ['./create-prize.component.scss']
})
export class CreatePrizeComponent {

  form: FormGroup;
  price = new FormControl(0, [Validators.required, Validators.min(1)]);
  amount = new FormControl(0, [Validators.required, Validators.min(1)]);
  img = new FormControl();

  error?: string;
  imagePreview?: string | ArrayBuffer | null;
  imageData: any;

  constructor(private prizeService:PrizeService,private dialog: MatDialog,private location: Location) {
    this.form = new FormGroup({
      price: this.price,
      amount: this.amount,
      img: this.img
    });
  }

  submitForm() {
    if(this.form.valid){
      this.prizeService.createPrize(this.amount.value!,this.price.value!,this.imageData).subscribe(
        () => {
          this.dialog.open(ConfirmationModalComponent, {
            disableClose: true,
            data: {
              message: "prize-added",
              content: "more-prize",
              cancel:true
            }
          }).afterClosed().subscribe(
            (value) => {
              if (!value) {
                this.location.back();
              }
            }
          )
        }
      )
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.imageData = file;

      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        if (width < height) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imagePreview = (e.target as FileReader).result;
          };
          reader.readAsDataURL(file);
        } else {
          this.img.setValue(undefined);
          this.img.setErrors({ 'incorrectOrientation': true });
          this.imagePreview = null;
        }
      };
    }
  }

}
