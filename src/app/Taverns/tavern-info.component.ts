import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService, IRoom } from './room.service';
import { TavernsService } from './taverns.service';


@Component({
  selector: 'app-tavern-info',
  templateUrl: './tavern-info.component.html'
})


export class TavernInfoComponent implements OnInit {
  isNew: boolean;
  tavern;
  room: IRoom;
  tavernForm = new FormGroup({
  RoomName: new FormControl('', [Validators.required]),
  DailyRate: new FormControl('', [Validators.required]),
  }
);

  constructor(private roomService: RoomService,
              private tavernsService: TavernsService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.tavernsService.getTavern('').subscribe((returnedTavern) => {
      this.tavern = returnedTavern;
      const tavernID = this.tavern;
      return tavernID;
    });
    
    const roomId: string = this.route.snapshot.params.roomId;
    console.log(roomId);
    if (roomId === 'add'){
      this.isNew = true;
    } else {
      this.isNew = false;
      this.roomService.getById(+roomId).subscribe((room => {
        this.room = room;
        this.tavernForm.setValue({RoomName: room.RoomName, DailyRate: room.DailyRate});
      }));
    }
    return roomId;
  }


  editRoom(): void {
    const roomId: string = this.route.snapshot.params.roomId;
    if (this.tavernForm.valid) {
      const payload = {
        RoomName: String(this.tavernForm.value.RoomName),
        DailyRate: parseFloat(String(this.tavernForm.value.DailyRate)),
        RoomStatus: 0,
        ID: +roomId,
        TavernID: +this.tavern[0].ID[0]
      };
      console.log(payload);
   this.roomService.saveRoom(payload).subscribe((room: IRoom) => {
    this.router.navigate(['/my-tavern']);

 });
    }
}
}
