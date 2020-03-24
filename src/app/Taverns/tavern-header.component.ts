import { Component, OnInit } from '@angular/core';
import { AuthService, IUser } from '../common/auth/auth.service';

@Component({
  selector: 'app-tavern-header',
  templateUrl: './tavern-header.component.html'
})
export class TavernHeaderComponent implements OnInit {
  UserName: string;
  constructor(private authservice: AuthService) { }

  ngOnInit() {
    const user: IUser = JSON.parse(
      String(this.authservice.currentUser.getValue().user)
    );
    this.UserName = user.UserName;
  }

}
