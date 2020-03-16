import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TavernsComponent } from './taverns.component';
import { AuthGuard } from '../common/auth/auth.guard';
import { TavernInfoComponent } from './tavern-info.component';


const tavernRoutes: Routes = [
  { path: 'my-tavern', component: TavernsComponent, canActivate: [AuthGuard] },
  { path: 'my-tavern/modify-tavern', component: TavernInfoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(tavernRoutes)],
})
export class TavernsRoutingModule {

}
