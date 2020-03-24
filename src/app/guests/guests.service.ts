import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface IGuest {
  UserName: string;
  ID: number;
}

export interface IRoomInfo {
  RoomName: string;
  DailyRate: number;
  RoomStatus: number;
  TavernID: number;
  ID: number;
}

@Injectable({
  providedIn: 'root'
})

export class GuestsService {

  constructor(private http: HttpClient) { }

  getGuests(): Observable<IGuest[]> {
    return this.http.get<IGuest[]> ('http://localhost:3000/users');
  }

  getRooms(): Observable<IRoomInfo[]> {
    return this.http.get<IRoomInfo[]> ('http://localhost:3000/rooms/book');
  }

}
