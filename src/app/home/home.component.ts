import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {User} from "../../model/user";
import {Deserialize} from "dcerialize";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user? : User;
  ngOnInit(): void {
    if(sessionStorage.getItem('user')){
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
  }

}
