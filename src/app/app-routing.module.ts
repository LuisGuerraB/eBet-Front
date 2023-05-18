import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BetComponent} from "./bet/bet.component";
import {UserComponent} from "./user/user.component";
import {RegisterComponent} from "./user/register/register.component";

const routes: Routes = [
  {path: '', redirectTo: '/bet', pathMatch: 'full'},
  {path: 'bet', component: BetComponent},
  {path: 'user', component: UserComponent,
    children: [
      {path: 'register', component: RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
