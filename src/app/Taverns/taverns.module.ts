import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TavernsComponent } from './taverns.component';
import { TavernsRoutingModule } from './taverns-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TavernsComponent],
  imports: [
    CommonModule, TavernsRoutingModule, FormsModule
  ]
})
export class TavernsModule { }
