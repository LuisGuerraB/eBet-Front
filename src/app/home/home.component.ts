import {Component, HostListener, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {SidenavComponent} from "./sidenav/sidenav.component";

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
  screenWidth?: number;
  thinner=true;

  constructor() {
    this.screenWidth = window.innerWidth;
    this.staticSideNav = this.screenWidth >= 1000;
  }

  @HostListener('window:resize', ['$event'])
  onResize($event:any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1000) {
      this.toggleSideNav()
      this.staticSideNav = false;
    }else{
      this.staticSideNav = true;
      if (this.staticSideNav && !this.thinner){
        this.toggleSideNav()
      }
    }
  }

  toggleSideNav() {
    this.thinner = !this.thinner
    this.sidenavComponent.toggleSidebar();
  }


}
