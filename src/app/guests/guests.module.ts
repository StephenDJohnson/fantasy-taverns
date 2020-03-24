import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { GuestsComponent } from './guests.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, NgbDatepicker, NgForm, ReactiveFormsModule, GuestsComponent
  ]
})
export class GuestsModule { }
