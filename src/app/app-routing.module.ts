import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "../guards/auth.guard";
import {LoginGuard} from "../guards/login.guard";

const routes: Routes = [
  {path: '', redirectTo: '/home/main', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', loadComponent: () => import('./home/main/main.component').then(m => m.MainComponent)},
      {path: 'bet/:matchId', loadComponent: () => import('./bet/bet-create/bet-create.component').then(m => m.BetCreateComponent)},
      {path: 'result/:matchId',loadComponent:()=> import('./match/match-result/match-result.component').then(m=>m.MatchResultComponent)},
      {path: 'bets',canActivate: [LoginGuard], loadComponent: () => import('./bet/bet-list/bet-list.component').then(m => m.BetListComponent)},
      {path: 'prizes', loadComponent: () => import('./prize/prize-list/prize-list.component').then(m => m.PrizeListComponent)},
      {
        path: 'league/:leagueId',
        loadComponent: () => import('./home/league/league.component').then(m => m.LeagueComponent)
      },
      {
        path: 'prize/new',
        loadComponent: () => import('./prize/create-prize/create-prize.component').then(m => m.CreatePrizeComponent),
        canActivate: [AuthGuard],
        data: {
          requiredPrivilege: 'marketing'
        }
      },
    ]
  },
  {
    path: 'auth', component: AuthComponent,
    children: [
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
      },
      {path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)},
      {path: 'more-ep',canActivate: [LoginGuard], loadComponent: () => import('./more-ep/more-ep.component').then(m => m.MoreEpComponent)},
      {path: 'error/:error', loadComponent: () => import('./error/error.component').then(m => m.ErrorComponent)},
      {path: 'edit',loadComponent: () => import('./user/user-edit/user-edit.component').then(m => m.UserEditComponent)},
    ]
  },
  {path: '**', redirectTo: '/auth/error/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
