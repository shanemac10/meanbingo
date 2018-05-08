import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http.service';
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private slate: string; //two-way bound to selct-option form for choosing a topic
  private available_users: any;
  private waiting_on: any;
  private ready_users: any;
  private my_socket: String;
  private my_status: String;
  private my_user_id: String;
  private game_name_if_in_playing_status: string;
  constructor(
    private _HttpService: HttpService,
    private _SocketService: SocketService,
    private _route: ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
    this.slate = "3";
    this.available_users = [];
    this.waiting_on = [];
    this.my_user_id = localStorage.getItem("USER_ID")
    this._SocketService.getUsersAvailable();
    this._SocketService.hereIsAListOfAvailableUsers().subscribe(data =>{ console.log("ALL USERS DATA :", data);
      this.available_users = Object.values(data);
      this.waiting_on = [];
      this.ready_users = [];
      for(let x = 0; x < this.available_users.length; x++){
        if(this.available_users[x]["status"] == "NOT_READY" ){
          this.waiting_on.push(this.available_users[x]);
        }
        if(this.available_users[x]["status"] == "READY" ){
          this.ready_users.push(this.available_users[x]);
        }
        if(this.available_users[x]["user_id"] == this.my_user_id){
          this.my_status = this.available_users[x]["status"];
          if(this.my_status == "PLAYING"){
            this.game_name_if_in_playing_status = localStorage.getItem("GAME_NAME"); // giving the user an oportunity to return to a game in progress or exit it...
          }
        }
      }
    })
  }


  setReady(){
    this._SocketService.setMeToReady();
    localStorage.setItem("STATUS", "READY");
  }
  setNotReady(){
    this._SocketService.setMeToNotReady();
    localStorage.setItem("STATUS", "NOT_READY");
  }

  
  playBingo(){
    if (this.ready_users.length){ console.log("PlayBingo - users: ", this.ready_users);
      this._SocketService.playBingo({
        ready_users: this.ready_users, 
        slate: this.slate
      });
    }else{
      console.log("NO USERS");
    }
  }



  goBackToMyGame(){
    if(localStorage.getItem("GAME_ID")!= null){
      this._router.navigate(['game/'+localStorage.getItem("GAME_ID")]);
    }
  }
  exitThatGame(){
    localStorage.setItem("STATUS", "NOT_READY");
    localStorage.removeItem("GAME_ID");
    localStorage.removeItem("GAME_NAME");
    this._SocketService.setMeToNotReady();
  }


  clear(){
    console.log("this.slate ", this.slate);
    
    // localStorage.clear();
    // this._router.navigate(["signin"]);
  }
    

}
