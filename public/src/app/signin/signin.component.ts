import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'; //<-- Router stuff

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public username: any;
  public feedback: any;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log("TEST");
    this.username = "";
    this.checkForUsernameInLocalStorage(); //redirects first-thing if the username is in local storage
    this.feedback = [];
  }

  checkForUsernameInLocalStorage(){ 
    let uname = localStorage.getItem("BINGO_USERNAME");
    console.log("TEST : ", uname);
    if(uname!="null" && uname!=null && uname.length >= 2 ){
      if(localStorage.getItem("GAME_ID")!= null){
        console.log("REDIRECT FROM signin.checkForUsernameInLocalStorage to ", localStorage.getItem("GAME_NAME"));
        this._router.navigate(['game/'+localStorage.getItem("GAME_ID")]);
      } else {
        console.log("REDIRECT FROM signin.checkForUsernameInLocalStorage to dashboard");
        this._router.navigate(['dashboard']); //dashboard with router
      }
    }
  }
  submitUsername(){
    this.feedback = [];
    if(this.username.length > 2 && this.username !=="null"){
      localStorage.setItem("BINGO_USERNAME", this.username);
      this.notify.emit(true); //tell parent to set the username badge
      // this._router.navigate(['dashboard']); //dashboard with router
    } else {
      if(this.username == "null"){
        this.feedback.push("You can't use 'null' as a username, ya dingus!");
      } else {
        this.feedback.push("Your username needs to be at least two characters");
      }
    }
  }

}
