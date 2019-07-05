import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ChartsModule } from 'ng2-charts';


import { LancamentoComponent } from './lancamento-cadastro/lancamento.component';
import { PrimengModule } from '../primeng/primeng.module';
import { LancamentoResumoComponent } from './lancamento-resumo/lancamento-resumo.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [LancamentoComponent, LancamentoResumoComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,


    ChartsModule,
    NgxCurrencyModule,
    PrimengModule




  ], exports: [
    LancamentoComponent,
    LancamentoResumoComponent,


  ], providers: [MessageService]
})
export class LancamentoModule { }
