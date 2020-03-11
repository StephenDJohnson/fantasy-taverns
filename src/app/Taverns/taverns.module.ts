import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TavernsComponent } from './taverns.component';
import { TavernsRoutingModule } from './taverns-routing.module';



@NgModule({
  declarations: [TavernsComponent],
  imports: [
    CommonModule, TavernsRoutingModule
  ]
})
export class TavernsModule { }
