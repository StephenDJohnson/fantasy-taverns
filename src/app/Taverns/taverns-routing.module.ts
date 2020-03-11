import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TavernsComponent } from './taverns.component';
import { AuthGuard } from '../common/auth/auth.guard';


const tavernRoutes: Routes = [
  { path: 'my-tavern', component: TavernsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(tavernRoutes)],
})
export class TavernsRoutingModule {

}
