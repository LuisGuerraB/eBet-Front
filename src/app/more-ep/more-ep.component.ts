import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {Deserialize} from "dcerialize";
import {UserLoginResponse} from "../../model/user";
import {SpinnerComponent} from "../spinner/spinner.component";
import {BackButtonComponent} from "../back-button/back-button.component";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-more-ep',
  standalone: true,
  imports: [CommonModule, TranslateModule, SpinnerComponent, BackButtonComponent],
  templateUrl: './more-ep.component.html',
  styleUrls: ['./more-ep.component.scss']
})
export class MoreEpComponent implements OnInit {
  displayTime?: string;
  remainingTime!: number;
  redeem = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('user')!);
    if (user) {
      let actualDate = new Date();
      user.last_login = new Date(user.last_login);
      user.last_login.setDate(user.last_login.getDate() + 1);
      let redeemDate = user.last_login;
      this.remainingTime = redeemDate.getTime() - actualDate.getTime();
    }
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.remainingTime -= 1000;

      const date = new Date(this.remainingTime);
      const hours = this.padNumber(date.getUTCHours());
      const minutes = this.padNumber(date.getUTCMinutes());
      const seconds = this.padNumber(date.getUTCSeconds());

      this.displayTime = `${hours}:${minutes}:${seconds}`;

      if (this.remainingTime <= 0) {
        clearInterval(interval);
        this.redeem = true;
      }

    }, 1000);
  }

  padNumber(number: number): string {
    return number.toString().padStart(2, '0'); // Agregar un cero a la izquierda si es necesario
  }


  redeemPrize() {
    this.authService.redeemPrize();
  }
}
