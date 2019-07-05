import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {RadioButtonModule} from 'primeng/radiobutton';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    RadioButtonModule,
    MessageModule,
    ChartModule





  ], exports: [

    CommonModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    RadioButtonModule,
    MessageModule,
    ChartModule



  ], providers: [
    ConfirmationService
  ]
})
export class PrimengModule { }

