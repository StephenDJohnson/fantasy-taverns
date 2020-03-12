import { Component, OnInit } from '@angular/core';
import { TavernsService, IMyTavern } from '../taverns.service';

@Component({
  templateUrl: './taverns.component.html'
})

export class TavernsComponent implements OnInit {

  tavern: IMyTavern[];
  constructor (private tavernsService: TavernsService) {}

  ngOnInit(): void{
    this.tavernsService.getTavern().subscribe((returnedTavern) => {
      this.tavern = returnedTavern;
    });
    console.log( this.tavern);
    }

}
