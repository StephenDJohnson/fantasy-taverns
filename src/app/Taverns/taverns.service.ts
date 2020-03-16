import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ITavern {
  ID: number;
  TavernName: string;
}

export interface IMyTavern {
  TavernName: string;
  RoomName: string;
  DailyRate: Float32Array;
  ID: number;
  TavernID: number;
  RoomStatus: number;
}

export interface IRoom {
  RoomName: string;
  DailyRate: Float32Array;
  RoomStatus: number;
  TavernID: number;
}

@Injectable({
  providedIn: 'root'
})
export class TavernsService {
  

  constructor(private http: HttpClient) { }

  getTaverns(): Observable<ITavern[]>{
    return this.http.get<ITavern[]> ('http://localhost:3000/taverns');
  }

  getTavern(searchText: string): Observable<IMyTavern[]>{
    return this.http.get<IMyTavern[]> (`http://localhost:3000/rooms?search=${searchText}`);
  }
}

