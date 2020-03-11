import { Component, OnInit } from '@angular/core';
import { TavernsService } from '../taverns.service';

@Component({
  templateUrl: './taverns.component.html'
})

export class TavernsComponent implements OnInit {

  constructor (private tavernsService: TavernsService) {}

  ngOnInit(): void{
    this.tavernsService.getTaverns().subscribe();
    }

}
