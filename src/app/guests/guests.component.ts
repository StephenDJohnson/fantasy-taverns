import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuestsService, IGuest, IRoomInfo } from './guests.service';
import { FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';


@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html'
})
export class GuestsComponent implements OnInit {

@Input() newRoom: IRoomInfo[];
@Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>>;

  guests: IGuest[];
  rooms: IRoomInfo[];
  newRooms: IRoomInfo[];
  guest = '';
  room = '';
  UserName = '';
  GuestID: number;
  Room;
  DailyRate: number;
  RoomName = '';
  date = new Date();
  duration = 1;
  startDate = this.date.toString().slice(4, 15);


  constructor(
              private router: Router,
              private guestService: GuestsService,
              private route: ActivatedRoute)
              { }

  ngOnInit() {
  console.log('comes into being');
  this.loadGuests();
  this.loadRooms();
  }

loadGuests() {
  this.guestService.getGuests().subscribe((guests) => {
    this.guests = guests;
    console.log(guests);
  });
}

loadRooms() {
  this.guestService.getRooms().subscribe((rooms) => {
    this.rooms = rooms;
    console.log(rooms);
  });
}

filterRooms(date: any) {
  this.guestService.getRooms().subscribe((rooms) => {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].StayDateStart == null ) {
     
     //console.log(rooms[i].StayDateStart.toString().slice(4, 15));
     this.rooms[i] = rooms[i];
      console.log("hi");
   }
    //console.log(rooms[i].StayDateStart.toString().slice(4, 15));
    }
  
});
}

book(): void {
  console.log('working');
    const payload = {
        GuestID: this.GuestID,
        RoomID: this.Room.ID,
        BookingDate: new Date().toString().slice(4, 15),
        StayDateStart: this.date.toString().slice(4, 15),
        StayLength: this.duration,
        DailyRate: this.Room.DailyRate
    };
    this.guestService.addStay(payload).subscribe((stay) => {
    this.router.navigate(['/my-tavern/book'])});
    this.GuestID = 0;
    this.Room = {
      RoomName: '',
      DailyRate: 0
    }
    this.date = new Date();
}

clear(): void {
  this.GuestID = 0;
  this.Room = {
    RoomName: '',
    DailyRate: 0
  }
}

}
