import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      username: this.username,
      password: this.password
    }  )
  }

  submitForm() {
    if (this.form.valid) {
      this.authService.login(this.username.value!, this.password.value!);
      //TODO redirect to main page
    } else {
      alert("Invalid Form");
    }
  }
}
