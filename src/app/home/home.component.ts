import {Component, HostListener, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, SidenavComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  staticSideNav = true;
  @ViewChild('sidebar') sidenavComponent!: SidenavComponent;
  screenWidth: number;
  thinner = true;
  private resizeSubject = new Subject();

  constructor() {
    this.screenWidth = window.innerWidth;
    this.staticSideNav = this.screenWidth >= 1000;
    this.resizeSubject.pipe(debounceTime(300)).subscribe(() => {
      if (this.screenWidth < 1000) {
        this.toggleSideNav()
        this.staticSideNav = false;
      } else {
        this.staticSideNav = true;
        if (this.staticSideNav && !this.thinner) {
          this.toggleSideNav()
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.screenWidth = window.innerWidth;
    this.resizeSubject.next('');
  }

  toggleSideNav() {
    this.thinner = !this.thinner
    this.sidenavComponent.toggleSidebar();
  }


}
