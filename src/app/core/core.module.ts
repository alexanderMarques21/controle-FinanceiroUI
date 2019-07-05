import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import {MenuModule} from 'primeng/menu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { NavComponent } from '../nav/nav.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,

    MenuModule,
    ButtonModule



  ], exports: [
    NavComponent,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule



  ]
})
export class CoreModule { }
