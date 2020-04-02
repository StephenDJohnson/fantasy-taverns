import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IRoom {
  RoomName: string;
  DailyRate: number;
  RoomStatus: number;
  TavernID: number;
  ID: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  constructor(private http: HttpClient) { }
  getById(id: number): Observable<IRoom>{
    return this.http.get<IRoom> (`http://localhost:3000/rooms/${id}`);
  }

  saveRoom(room: IRoom): Observable<IRoom> {
    const isEdit = room.ID > 0;
      if (isEdit) {
          return this.http.put<IRoom>(`http://localhost:3000/rooms/${room.ID}/`, room);
          } else {
          return this.http.post<IRoom>('http://localhost:3000/rooms', room);
          }
      }
  }

  
