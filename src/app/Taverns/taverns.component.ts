import { Component, OnInit, OnDestroy } from '@angular/core';
import { TavernsService, IMyTavern } from './taverns.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService, IUser } from '../common/auth/auth.service';


@Component({
  templateUrl: './taverns.component.html'
})

export class TavernsComponent implements OnInit, OnDestroy  {

  tavern: IMyTavern[];
  searchText = '';
  tavernName: string;
  isAdmin = false;
  role: number;
  searchUpdated = new Subject<string>();
  subscription = new Subscription();

  constructor (private tavernsService: TavernsService, private authService: AuthService) {
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
      this.tavernName = this.tavern[0].TavernName;
      return tavernID;
    });

    const user: IUser = JSON.parse(
      String(this.authService.currentUser.getValue().user)
    );
    this.role = user.RoleID;
    console.log(this.role);
    if (this.role == 1){
      this.isAdmin = true;
    }
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
