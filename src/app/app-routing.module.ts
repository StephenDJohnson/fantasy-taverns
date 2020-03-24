import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './common/auth/login/login.component';
import { AuthGuard } from './common/auth/auth.guard';
import { TavernsComponent } from './Taverns/taverns.component';

const appRoutes: Routes = [
    { path: 'my-tavern', component: TavernsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: TavernsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
