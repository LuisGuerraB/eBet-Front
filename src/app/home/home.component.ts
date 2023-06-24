import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {User} from "../../model/user";
import {UserAvatarComponent} from "../user/user-avatar/user-avatar.component";
import {AuthService} from "../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {Observable, Subscription} from "rxjs";
import {SessionStorageService} from "../../service/session-storage.service";

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
  balanceSubscription? :Subscription;

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog,private sessionStorage: SessionStorageService) {
  }

  ngOnInit(): void {
    this.user = this.sessionStorage.getItem('user')
    if (this.user) {
      this.balance = this.user!.balance;
    }
    this.balanceSubscription = this.sessionStorage.getChanges().subscribe((change: any) => {
      if (change.key === 'user') {
        if (change.value == undefined){
          this.balance = 0;
        }else{
          this.balance = change.value.balance;
        }
      }
    });
  }

  navigate(url:string) {
    if (this.user) {
      this.router.navigate([url]);
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
          this.balance = 0;
          this.user =undefined;
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
