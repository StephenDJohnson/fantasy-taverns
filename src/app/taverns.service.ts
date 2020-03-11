import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ITavern {
  Id: number;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TavernsService {

  constructor(private http: HttpClient) { }

  getTaverns(): Observable<ITavern[]>{
    return this.http.get<ITavern[]> ('http://localhost:3000/Taverns');
  }
}
