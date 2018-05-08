import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateboardComponent } from './createboard/createboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { WinnerComponent } from './winner/winner.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'game/:game_id', component: GameComponent},

  {path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
