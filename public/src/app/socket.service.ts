import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  constructor() { 
    // this.socket = io("http://localhost:8080");
    this.socket = io("http://18.188.212.124:8080");
  }

  //=== STATUS CHANGES ===//
  setMeToReady(){
    this.socket.emit("setMeToReady", localStorage.getItem("USER_ID"))
  }
  setMeToNotReady(){
    this.socket.emit("setMeToNotReady", localStorage.getItem("USER_ID"))
  }
  setMeToPlaying(){
    this.socket.emit("setMeToPlaying", localStorage.getItem("USER_ID"))
  }



  playBingo(game_info){ //asks for new Bingo Game to be made
    this.socket.emit("playBingo", game_info);
    console.log("SOCKET SERVICE - PlayBIngo");
  }
  goToGame(){ //gets bask new Bingo Game info, and redirect info to get to the new Game
    return Observable.create(observer => {
      this.socket.on('goToGame', data => {
        observer.next(data);
      });
    });
  }
  iHaveABingo(bingo_info){
    this.socket.emit("iHaveABingo", bingo_info)
  }
  gameOver(){
    return Observable.create(observer =>{
      this.socket.on("gameOver", data=>{
        observer.next(data);
      })
    })
  }

  updateTheUserlist(){ //sends the username (new or updated) to the server
    this.socket.emit("updateTheUserlist", localStorage.getItem("USER_ID"), localStorage.getItem("BINGO_USERNAME"), localStorage.getItem("STATUS"));
    // the users' first SOCKET_ID will become the USER_ID (key) for the user in the userlist 
    // on the server, moving forward. At this point the user should have just recieved their 
    // SOCKET_ID and saved accodingly, we will send out USER_ID and BINGO_USERNAME to the server
    // where it will store or update the userlist, also adding the SOCKET_ID on it's end.
    // A newly update userlist will then be sent out to everyone.
  }

  getUsersAvailable(){ //get's a list back to only this socket
    this.socket.emit("giveMeAListOfAvailableUsers");
  }
  hereIsAListOfAvailableUsers() { //catches ANY updates to the user list - SHOULD ALWAYS UPDATE IMMEDIATELY
    return Observable.create(observer => {
      this.socket.on('hereIsAListOfAvailableUsers', data => {
        observer.next(data);
      });
    });
  }


  whatsMySocket(){ //asks for the individual user's socket.id
    this.socket.emit("whatsMySocket");
  }
  youAreOn() {
    return Observable.create(observer => {
      this.socket.on('youAreOn', data => {
        observer.next(data);
      });
    });
  }
}
