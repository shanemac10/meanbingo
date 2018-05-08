import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //<--

@Injectable()
export class HttpService {

  constructor( private _http: HttpClient ) { }

  getBoard(game_id, user_id){
    return this._http.get("/board/"+ game_id +"/"+ user_id);
  }
}
