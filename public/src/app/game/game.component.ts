import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
// import * as io from 'socket.io-client';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board:any; // stays un-touched, order set by server side -- i.e. a const
  cardName: String; // is copy of the board.name
  card:any; //is the localy augmented version of the board.board 
  map: any; //is a version of card mapped out to booleans for easy BINGO testing logic
  socket: SocketIOClient.Socket;
  gameover: any;

  constructor(
    private _HttpService: HttpService,
    private _SocketService: SocketService,
    private _route: ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
    // GET THE BOARD
    this._route.params.subscribe((params: Params) =>{
      console.log("HERE");
      if(localStorage.getItem("GAME_ID") ==  params['game_id']){
        this.getTheBoard( params['game_id'] );
        console.log("HERE");
      } else {
        this._router.navigate(['dashboard']);
        console.log("HERE");
      } 
    });
    this.gameover = false;
    this.cardName = localStorage.getItem("GAME_NAME");
    
    // LISTEN FOR GAMEOVER
    this._SocketService.gameOver().subscribe(data=>{
      console.log("GAME OVER RECIEVED : ", data);
      if(data.game_id == localStorage.getItem("GAME_ID")){
        this.cardName = "GAME OVER";
        this.gameover = data;
        if(data.user_id == localStorage.getItem("USER_ID")){
          this.gameover["winner"] = true;
        } else {
          this.gameover["winner"] = false;
        }
      } else {
        console.log("GAME OVER WASN'T FOR THIS GAME");
      } 
    })
  } // END ngOnInit
  
  getTheBoard(game_id){
    // console.log("GAME.GETTHEBOARD : ", game_id);
   let ob = this._HttpService.getBoard(game_id, localStorage.getItem("USER_ID"));
    ob.subscribe(data=>{
      console.log("GAME INFO :",data);
      if(data["over"] == true){ //if this game has already been played and won
        this.cardName = "GAME OVER";
        this.gameover = data["winner"];
        if(this.gameover["user_id"] == localStorage.getItem("USER_ID")){
          this.gameover["winner"] = true;
        } else {
          this.gameover["winner"] = false;
        }
        this.board = data;
        this.makeACard();
      }else{
        this.board = data;
        this.makeACard();
      }
    })
  }

  makeACard(){ //adds classes for the template -- DOES NOT CHANGE THE INDEXES
    this.card = this.board['board'].slice(0); //makes a new copy of board, for local manipulation
    this.map = [];
    for(let x=0; x<this.card.length; x++){
      this.card[x].class = "unclicked";
      this.map[x] = false; //map the status of the game into an Array of Booleans
    }
    // console.log("FRESHLY MADE: ",this.card);
  }
  exitGame(){
    localStorage.setItem("STATUS", "NOT_READY");
    localStorage.removeItem("GAME_ID");
    localStorage.removeItem("GAME_NAME");
    this._SocketService.setMeToNotReady();
    this._router.navigate(['dashboard']);
  }







  //=== GAME LOGIC ===//
  boxClick(sq,idx){
    if (this.gameover == false){
        
      // console.log("CLICKED : ",sq.id," : " ,idx);
      if (sq.class=="unclicked"){
        sq.class = "clicked";
        this.map[idx] = true;
      } else {
        sq.class = "unclicked";
        this.map[idx] = false;
      }
    
      let test = this.map;

      if(test[0]&&test[1]&&test[2]&&test[3]&&test[4]){
        this.cardName = "BINGO!"
      }else
      if(test[5]&&test[6]&&test[7]&&test[8]&&test[9]){
        this.cardName = "BINGO!"
      }else
      if(test[10]&&test[11]&&test[12]&&test[13]&&test[14]){
        this.cardName = "BINGO!"
      }else
      if(test[15]&&test[16]&&test[17]&&test[18]&&test[19]){
        this.cardName = "BINGO!"
      }else
      if(test[20]&&test[21]&&test[22]&&test[23]&&test[24]){
        this.cardName = "BINGO!"
      }else
      if(test[0]&&test[5]&&test[10]&&test[15]&&test[20]){
        this.cardName = "BINGO!"
      }else
      if(test[1]&&test[6]&&test[11]&&test[16]&&test[21]){
        this.cardName = "BINGO!"
      }else
      if(test[2]&&test[7]&&test[12]&&test[17]&&test[22]){
        this.cardName = "BINGO!"
      }else
      if(test[3]&&test[8]&&test[13]&&test[18]&&test[23]){
        this.cardName = "BINGO!"
      }else
      if(test[4]&&test[9]&&test[14]&&test[19]&&test[24]){
        this.cardName = "BINGO!"
      }else
      if(test[0]&&test[6]&&test[12]&&test[18]&&test[24]){
        this.cardName = "BINGO!"
      }else
      if(test[20]&&test[16]&&test[12]&&test[8]&&test[4]){
        this.cardName = "BINGO!"
      }
      else{
        this.cardName = localStorage.getItem("GAME_NAME")
      }
      if(this.cardName == "BINGO!"){
        this._SocketService.iHaveABingo(
          {
            game_id: localStorage.getItem("GAME_ID"),
            user_id: localStorage.getItem("USER_ID"),
            username: localStorage.getItem("BINGO_USERNAME")
          }
        );
      }
    } 
  }
    

}