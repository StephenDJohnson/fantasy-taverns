import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IRoom {
  RoomName: string;
  DailyRate: Float32Array;
  RoomStatus: number;
  TavernID: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  constructor(private http: HttpClient) { }

  addRoom(room: IRoom): Observable<IRoom> {
    return this.http.post<IRoom>('http://localhost:3000/rooms', room);
}

}
