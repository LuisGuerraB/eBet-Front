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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup;
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  repassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      repassword: this.repassword
    }, {validators: validateMatchPassword as ValidatorFn});
  }

  submitForm() {
    if (this.form.valid) {
      this.authService.register(this.username.value!, this.email.value!, this.password.value!);
      //TODO redirect to login page
    } else {
      alert("Invalid Form");
    }
  }

}

function validateMatchPassword(form: FormGroup) : ValidationErrors |null {
  const password = form.get('password')!.value;
  const repassword = form.get('repassword')!.value;

  if (password === repassword) {
    return null;
  } else {
    return {noMatch: true};
  }
}
