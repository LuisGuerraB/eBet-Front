import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {UserAvatarComponent} from "../../user/user-avatar/user-avatar.component";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {User} from "../../../model/user";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {SessionStorageService} from "../../../service/session-storage.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, TranslateModule, UserAvatarComponent],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})
export class SidenavComponent implements OnInit{

  user?: User;
  balance = 0;
  balanceSubscription? :Subscription;
  isSidebarOpen = true;

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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  get sidebarState() {
    return this.isSidebarOpen ? 'open' : 'closed';
  }

  navigate(url: string) {
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
          this.user = undefined;
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
