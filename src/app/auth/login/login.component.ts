import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {FormErrorMessagesComponent} from "../../form-error-messages/form-error-messages.component";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {User} from "../../../model/user";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [MatDialogModule,NgIf, FormsModule, ReactiveFormsModule, TranslateModule, FormErrorMessagesComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  error? : string;
  constructor(private authService: AuthService,private router : Router,private dialog: MatDialog) {
    this.form = new FormGroup({
      username: this.username,
      password: this.password
    }  )
  }

  submitForm() {
    if (this.form.valid) {
      this.authService.login(this.username.value!, this.password.value!).subscribe(
        (user:User) => {
          let content = undefined;
          if (user.prize){content = 'obtained-create-prize'}
          this.dialog.open(ConfirmationModalComponent, {
            data: {
              message: "login-successful",
              content: content,

            }
          }).afterClosed().subscribe(
            () => this.router.navigate(['/'])
          )
        },
        (err) => {
          this.error = err.message;
        }
      )
    }
  }
}
