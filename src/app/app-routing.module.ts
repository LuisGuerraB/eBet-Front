import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BetComponent} from "./bet/bet.component";
import {AuthComponent} from "./auth/auth.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {MainComponent} from "./home/main/main.component";

const routes: Routes = [
  {path: '', redirectTo: '/home/main', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: MainComponent},
      {path: 'bet', component: BetComponent}
    ]
  },
  {path: 'auth', component: AuthComponent,
    children: [
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
