import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuestsService, IGuest, IRoomInfo } from './guests.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html'
})
export class GuestsComponent implements OnInit {

  guests: IGuest[];
  rooms: IRoomInfo[];
  guest = '';
  room = '';
  UserName = '';
  ID: number;
  RoomID: number;
  RoomName = '';
  date: any;

  constructor(
              private router: Router,
              private guestService: GuestsService,
              private route: ActivatedRoute)
              { }

  ngOnInit() {
  console.log('comes into being');
  this.guestService.getGuests().subscribe((guests) => {
    this.guests = guests;
    console.log(guests);
      });

  this.guestService.getRooms().subscribe((rooms) => {
    this.rooms = rooms;
    console.log(rooms);
  });
    }


book(): void {
  console.log('working');
    const payload = {
        ID: this.ID,
        RoomID: this.RoomID,
        date: this.date
    };
    console.log(payload);
}
}
