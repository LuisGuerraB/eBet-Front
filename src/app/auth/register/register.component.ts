import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {AuthService} from "../../../service/auth.service";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormErrorMessagesComponent} from "../form-error-messages/form-error-messages.component";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatDialogModule,TranslateModule, ReactiveFormsModule, FormsModule, NgIf, FormErrorMessagesComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup;
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  repassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  error?: string;

  constructor(private authService: AuthService, private router: Router,private dialog: MatDialog) {
    this.form = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      repassword: this.repassword
    }, {validators: validateMatchPassword as ValidatorFn});
  }

  submitForm() {
    if (this.form.valid) {
      this.authService.register(this.username.value!, this.email.value!, this.password.value!).subscribe(
        () => {
          this.dialog.open(ConfirmationModalComponent, {
            data: {
              message: "register-successful"
            }
          }).afterClosed().subscribe(
            () => this.router.navigate(['/user/login'])
          )
        },
        (err) => {
          this.error = err.message;
        }
      );
    } else {
      this.error = "control-error.match-password";
    }
  }

}

function validateMatchPassword(form: FormGroup): ValidationErrors | null {
  const password = form.get('password')!.value;
  const repassword = form.get('repassword')!.value;

  if (password === repassword) {
    return null;
  } else {
    return {noMatch: true};
  }
}
