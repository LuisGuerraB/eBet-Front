import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {User} from "../../model/user";
import {UserAvatarComponent} from "../user/user-avatar/user-avatar.component";
import {AuthService} from "../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, UserAvatarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: User;
  balance = 0;

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      this.balance = this.user!.balance;
    }
  }

  getMore() {
    if (this.user){
      this.router.navigate(['auth/more-ep']);
    } else {
      this.dialog.open(ConfirmationModalComponent, {
        data: {
          message: "login-required"
        }
      })
    }
  }

  redirect(action: string) {
    if (action != 'log-out') {
      this.router.navigate([action]);
    } else {
      this.authService.logOut().subscribe(
        () => {
          this.balance=0;
          this.dialog.open(ConfirmationModalComponent, {
            data: {
              message: "log-out-successful"
            }
          })
        }
      )

    }
  }

}
