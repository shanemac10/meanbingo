import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { SocketService } from './socket.service';
import { HttpClientModule } from '@angular/common/http'; //<-- http
import { CreateboardComponent } from './createboard/createboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { WinnerComponent } from './winner/winner.component';
import { GameComponent } from './game/game.component';

 

@NgModule({
  declarations: [
    AppComponent,
    CreateboardComponent,
    DashboardComponent,
    SigninComponent,
    WinnerComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
