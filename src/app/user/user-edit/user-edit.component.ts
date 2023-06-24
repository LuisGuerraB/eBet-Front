import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackButtonComponent} from "../../back-button/back-button.component";
import {FormErrorMessagesComponent} from "../../auth/form-error-messages/form-error-messages.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user";
import {SpinnerComponent} from "../../spinner/spinner.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {ChangeAttributeModalComponent} from "./change-attribute-modal/change-attribute-modal.component";
import {ChangeImgModalComponent} from "./change-img-modal/change-img-modal.component";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, FormErrorMessagesComponent, ReactiveFormsModule, TranslateModule, SpinnerComponent],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  form: FormGroup;
  username = new FormControl('', [Validators.required]);
  user!: User;
  error?: string;

  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.form = new FormGroup({
      username: this.username,
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this.username.setValue(user.username);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  openTransaction(attribute: string) {
    this.dialog.open(ChangeAttributeModalComponent, {
      data: {
        message: 'write-actual-' + attribute,
        attribute: attribute
      }
    }).afterClosed().subscribe(
      (field: string) => {
        if (field) {
          this.authService.checkAttribute(attribute, field).subscribe(
            () => {
              this.changeAttribute(attribute)
            }
            ,
            (err: any) => {
              this.dialog.open(ConfirmationModalComponent, {
                data: {
                  message: attribute + '-no-match',
                  content: 'try-again'
                }
              })
            }
          )
        }
      })
  }

  private changeAttribute(attribute: string) {
    this.dialog.open(ChangeAttributeModalComponent, {
      data: {
        message: 'write-new-' + attribute,
        attribute: attribute
      }
    }).afterClosed().subscribe(
      (field: string) => {
        if (field) {
          this.authService.changeAttribute(attribute, field).subscribe(
            () => {
              this.dialog.open(ConfirmationModalComponent, {data: {message: 'change-' + attribute + '-successfully'}})
            },
            (err: any) => {
              this.dialog.open(ConfirmationModalComponent, {data: {message: 'something-went-wrong'}})
            }
          )
        }
      })
  }

  submitForm() {
    if (this.form.valid) {
      this.user.username = this.username.value!;
      this.authService.updateUser(this.user).subscribe(
        () => {
          this.dialog.open(ConfirmationModalComponent, {data: {message: 'update-successful'}})
        },
        (err: any) => {
          this.error = err;
        }
      )
    }
  }

  openEditImg() {
    this.dialog.open(ChangeImgModalComponent, {
      data: {
        img: this.user.img
      }
    }).afterClosed().subscribe(
      (data) => {
        if (data == true) {
          this.dialog.open(ConfirmationModalComponent, {data: {message: 'user-img-change-successful'}}).afterClosed().subscribe(
            () => {
              this.ngOnInit();
            }
          )
        } else if (data === false) {
          this.dialog.open(ConfirmationModalComponent, {data: {message: 'user-img-change-unsuccessful'}})
        }
      }
    )
  }
}
