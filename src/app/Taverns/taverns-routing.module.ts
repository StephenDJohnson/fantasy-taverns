import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TavernsComponent } from './taverns.component';
import { AuthGuard } from '../common/auth/auth.guard';
import { TavernInfoComponent } from './tavern-info.component';
import { TavernHeaderComponent } from './tavern-header.component';
import { GuestsComponent } from '../guests/guests.component';


const tavernRoutes: Routes = [
  { path: 'my-tavern', component: TavernHeaderComponent, canActivate: [AuthGuard] ,
    children: [{ path: '', component: TavernsComponent, canActivate: [AuthGuard]},]},

    { path: 'my-tavern/book', component: TavernHeaderComponent, canActivate: [AuthGuard] ,
    children: [{ path: '', component: GuestsComponent, canActivate: [AuthGuard]},]},

    { path: 'rooms', component: TavernHeaderComponent, canActivate: [AuthGuard] ,
    children: [
      { path: '', component: TavernInfoComponent, canActivate: [AuthGuard] },
      { path: ':roomId', component: TavernInfoComponent, canActivate: [AuthGuard]}
  ]}
];




@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(tavernRoutes)],
})
export class TavernsRoutingModule {

}
