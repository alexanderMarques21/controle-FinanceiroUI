import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { Lancamento } from 'src/app/core/model';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';



@Component({
  selector: 'app-lancamento-resumo',
  templateUrl: './lancamento-resumo.component.html',
  styleUrls: ['./lancamento-resumo.component.scss']
})

export class LancamentoResumoComponent implements OnInit {

  titulos = ['Receitas', 'Despesas'];
  data: any;
  lancamentos = [];
  totalRegistros;
  itensPorPagina;
  paginaAtual;

  constructor(
    private lancamentoService: LancamentoService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {

    this.dadosGrafico();

  }

  listar(pagina?) {

    this.lancamentoService.listaComPaginacao(pagina).subscribe(data => {
      this.lancamentos = data.content;
      this.totalRegistros = data.totalElements;
      this.itensPorPagina = data.size;


    });



  }
  confirmarExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse lancamento ?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(id);
      }
    });

  }
  excluir(id: number) {
    this.lancamentoService.excluir(id).subscribe(() => {

      // retira o elemento deletado do banco do array da tabela
      this.lancamentos = this.lancamentos.filter(lancamento => {
        return lancamento.id !== id;
      });
      this.dadosGrafico();
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    console.log(event.first);
    this.paginaAtual = event.first / event.rows;
    this.listar(this.paginaAtual);
  }

  dadosGrafico() {
    this.lancamentoService.estatisticarPorCategoria().subscribe(data => {
      // Caso esteja registrado apenas lançamentos da mesma categoria é necessario
      // validar qual o tipo antes de desenhar o gráfico.
      console.log(data);
      if (data.length === 1) {
        this.data = {
          labels: [data[0].tipo === 1 ? 'Despesa' : 'Lançamento'],
          datasets: [
            {
              data: [data[0].total],
              backgroundColor: [data[0].tipo === 1 ? '#C01120' : '#007AD9 '],
              hoverBackgroundColor: [ '#FF6384',   '#36A2EB']
            }
          ]
        };

      } else if (data.length === 2) {
        this.data = {
          labels: [data[0].tipo === 1 ? 'Despesa' : 'Receita',  data[1].tipo === 2 ? 'Receita' : 'Despesa'],
          datasets: [
            {
              data: [ data[0].total,  data[1].total ],
              backgroundColor: [data[0].tipo === 1 ? '#C01120' : '#007AD9',  data[1].tipo === 2 ? '#007AD9' : '#C01120'],
            }]
        };
      }
    });
  }

}
