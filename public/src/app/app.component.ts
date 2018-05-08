import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'; //<-- Router stuff
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public username: any; // used for the username badge
  constructor( 
    private _route: ActivatedRoute,
    private _SocketService: SocketService,
    private _router: Router
  ){}

  ngOnInit(){
    console.log("TEST");
    this._SocketService.youAreOn().subscribe(data=>{
      console.log("TEST");
      localStorage.setItem("SOCKET_ID", data.socket_id);
      if(localStorage.getItem("USER_ID") == null){
        localStorage.setItem("USER_ID", data.socket_id);
        // on the first visit, the USER_ID is set to SOCKET_ID.
        // Hence forth the USER_ID should remain the same
      }
      console.log("TEST - HERE REDIRECT?");
      this.checkStatus();
      this.checkinUser(); //fully registers the user in the userlist on the server
    })
    //console.log("TEST");
    this._SocketService.whatsMySocket();


    // GO TO GAME - LISTENER FOR START OF GAME
    this._SocketService.goToGame().subscribe(data=>{
      console.log("GO TO GAME : ", data);
      localStorage.setItem("GAME_ID", data.game_id);
      localStorage.setItem("GAME_NAME", data.game_name);
      localStorage.setItem("STATUS", "PLAYING");
      this._SocketService.setMeToPlaying();
      this._router.navigate(['game/'+ data.game_id]);
    })

    // TODO - if the user us in a current game, redirect to it (use goToGame?)
  
  } //=== END ngOnInit() ===//


  checkinUser(){
    if(localStorage.getItem("BINGO_USERNAME") != null){
      this.username = localStorage.getItem("BINGO_USERNAME"); 
      this._SocketService.updateTheUserlist(); // send the username and other info from localStorage to be stored in the Userlist in the server
    }
    // END if BINGO_USERNAME
  } // END checkinUser()


  checkStatus(){
    let status = localStorage.getItem("STATUS");
    if(status == null){
      localStorage.setItem("STATUS", "NOT_READY");
      // this scenerio the user is probably in signin.component
    } else if(status == "NOT_READY"){
      // this._SocketService.setMeToNotReady();
    } else if(status == "READY"){
      // this._SocketService.setMeToReady();
    } else if(status == "PLAYING"){
      // oportunity to re-direct
    }
  }

  resetTheUsername(){ // when the user clicks on their name badge, they can change their name
    let rename = prompt("Username?", this.username);
    if(rename!== null){ // null == user clicking cancel
      while(rename.length < 2 || rename==="null" ){
        let feedback = "";
        if(rename.length < 2){
          feedback = "Your username has to be at least two characters..."
        } else if (rename==="null" ){
          feedback = "Your username cannot be 'null', ya dingus!"
        }
        rename = prompt(feedback, this.username);
        if(rename==null){break} // null == user clicking cancel
      }
      if(rename!==null){ // null == user clicking cancel
        localStorage.setItem("BINGO_USERNAME", rename);
        this.username = rename;
        this._SocketService.updateTheUserlist();
      }
    }
  }
  
  onNotify(hasUname: boolean){ 
    // signin.component will check for username in local storage, then notify
    // app to redirect to dashboard from here...
    if(hasUname){
      this.checkinUser(); //if there was no BINGO_USERNAME this will not have ran - sets all the client info up on both client and server side
      console.log("REDIRECT FROM onNotify to dashboard");
      this._router.navigate(['dashboard']);
    }
  }


}
