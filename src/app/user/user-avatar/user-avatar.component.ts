import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {User} from "../../../model/user";

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [NgIf, TranslateModule],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent {

  @Input() user?: User|undefined;
  @Output() redirectEmit = new EventEmitter<string>();

  emit(action:string) {
    this.user = undefined;
    this.redirectEmit.emit(action);
  }

}
