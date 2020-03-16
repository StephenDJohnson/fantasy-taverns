import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IMyTavern, TavernsService } from './taverns.service';
import { Router } from '@angular/router';
import { RoomService, IRoom } from './room.service';
import {  } from './taverns.component';

@Component({
  selector: 'app-tavern-info',
  templateUrl: './tavern-info.component.html'
})


export class TavernInfoComponent implements OnInit {
  constructor(private tavernService: TavernsService, private roomService: RoomService, private router: Router) { }
  @Input() tavern: IMyTavern[];
  ngOnInit() {
  }

  add_Room(tavernForm: NgForm): void {
    console.log('Im here');
    if (tavernForm.valid) {
      tavernForm.value.DailyRate = parseFloat(tavernForm.value.DailyRate);
      const newRoom: IRoom = tavernForm.value;
      newRoom.TavernID = 1;
      newRoom.RoomStatus = 0;
      console.log(newRoom);
      this.roomService.addRoom(newRoom).subscribe((new_room: IRoom) => {
       this.router.navigateByUrl('/my-tavern');
      });
    }
    }
  }
