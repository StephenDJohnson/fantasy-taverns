import { Component, OnInit, OnDestroy } from '@angular/core';
import { TavernsService, IMyTavern } from './taverns.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  templateUrl: './taverns.component.html'
})

export class TavernsComponent implements OnInit, OnDestroy  {

  tavern: IMyTavern[];
  searchText = '';

  searchUpdated = new Subject<string>();
  subscription = new Subscription();

  constructor (private tavernsService: TavernsService) {
    this.subscription = this.searchUpdated.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      ).subscribe((searchValue) => {
        this.searchRooms(searchValue);
      });
  }

  search($event): void {
    this.searchUpdated.next($event.target.value);
  }

  searchRooms(searchValue: string){
    this.tavernsService.getTavern(searchValue).subscribe((rooms) => {
      this.tavern = rooms;
    });
  }

  ngOnInit(): any {
    this.tavernsService.getTavern('').subscribe((returnedTavern) => {
      this.tavern = returnedTavern;
      const tavernID = this.tavern;
      return tavernID;
    });
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
