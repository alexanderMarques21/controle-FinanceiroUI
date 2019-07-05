import { Lancamento } from './core/model';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentoResumoComponent } from './lancamento/lancamento-resumo/lancamento-resumo.component';
import { LancamentoComponent } from './lancamento/lancamento-cadastro/lancamento.component';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentoResumoComponent },
  { path: 'lancamentos/novo',  component: LancamentoComponent},
  { path: 'lancamentos/novo/:id',  component: LancamentoComponent },
  { path: '',  pathMatch: 'full', redirectTo: '/lancamentos'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
