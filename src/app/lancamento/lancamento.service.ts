import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';




import { MessageService } from 'primeng/api';
import { tap, map } from 'rxjs/operators';
import * as moment from 'moment';

import { Lancamento } from '../core/model';
import { Observable, throwError } from 'rxjs';


export interface LancamentoPage {
  totalElements: number;
  totalPages;
  size;
  lancamento: Lancamento;
}


const url = 'http://localhost:8080/controleFinan/lancamentos';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentos;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private route: Router
  ) {
  }

  buscar(id: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${url}/${id}`);
  }

  listaComPaginacao(pagina?): Observable<any> {

    let params = new HttpParams();
    params = params.append('linhasPorPagina', '5');

    if (pagina) {
      params = params.append('page', pagina);
    }

    return this.http.get(`${url}/page`, { params });

  }


  salvar(lancamento: Lancamento) {
    // Faz a conversao da data para um objeto moment
    const momentObject = moment(lancamento.vencimento, 'DD-MM-YYYY');
    // Retira a data no padrão dd/mm/yyyy do objeto moment e aplica ao lançamento
    lancamento.vencimento = momentObject.format('DD/MM/YYYY').toString();
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    this.http.post(`${url}`, lancamento, { headers }).subscribe(
      data => {
        this.route.navigate(['/lancamentos']);
        this.messageService.add({ severity: 'success', summary: 'Salvo com sucesso', detail: 'O lançamento foi salvo com sucesso.' });
      },
      error => {
        this.handleError(error);
        this.messageService.add({ severity: 'warn', summary: 'Ocorreu um erro', detail: 'Erro ao salvar objeto' });
      }
    );

  }

  atualizar(id: number, lancamento: Lancamento) {

    // Faz a conversao da data para um objeto moment
    const momentObject = moment(lancamento.vencimento, 'DD-MM-YYYY');
    // Retira a data no padrão dd/mm/yyyy do objeto moment e aplica ao lançamento
    lancamento.vencimento = momentObject.format('DD/MM/YYYY').toString();
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    this.http.put(`${url}/${id}`, lancamento, { headers }).subscribe(
      () => {
        this.route.navigate(['/lancamentos']);
        this.messageService.add({
          severity: 'success', summary: 'Atualizado com sucesso',
          detail: 'O lançamento foi atualizado com sucesso.'
        });
      },
      error => {
        this.handleError(error);
        this.messageService.add({
          severity: 'warn', summary: 'Ocorreu um erro',
          detail: 'Erro ao salvar objeto, por favor tente novamente'
        });
      });

  }

  excluir(id: number): Observable<any> {

    // Usado o método tap para fazer a resposta e manter o subscribe
    // para que seja usado no component
    return this.http.delete(`${url}/${id}`).pipe(tap
      (() => {
        this.messageService.add({ severity: 'success', summary: 'Excluído com sucesso', detail: 'O lançamento foi excluído com sucesso.' });

      }, error => {
        this.handleError(error);
        this.messageService.add({ severity: 'warn', summary: 'Ocorreu um erro', detail: 'Erro ao deletar objeto' });
      }
      ));

  }

  estatisticarPorCategoria(): Observable<any> {
    return this.http.get(`${url}/estatisticas/por-categoria`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
