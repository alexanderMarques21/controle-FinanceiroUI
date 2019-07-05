import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




import { Lancamento } from 'src/app/core/model';
import { LancamentoService } from '../lancamento.service';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})


export class LancamentoComponent implements OnInit {


  formLancamento: FormGroup;
  pt;
  id;
  lancamento = new Lancamento();

  constructor(
    private formBuilder: FormBuilder,
    private lancamentoService: LancamentoService,
    private routes: ActivatedRoute
  ) { }



  ngOnInit() {
    this.id = this.routes.snapshot.params.id;
    this.formulario(this.lancamento);
    if (this.id) {
      this.buscar(this.id);
    }


    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
        'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Today',
      clear: 'Clear'

    };

  }

  formulario(lancamento: Lancamento) {
    this.formLancamento = this.formBuilder.group({
      descricao: [lancamento.descricao, [Validators.required]],
      vencimento: [lancamento.vencimento, [Validators.required]],
      valor: [lancamento.valor, [Validators.required]],
      tipo: [lancamento.tipo, [Validators.required]]
    });
  }

  salvar() {
    if (!this.id) {
      this.incluirLancamento();
    } else {
      this.atualizarLancamento();
    }
  }

  incluirLancamento() {
    this.lancamento = this.formLancamento.value;
    this.lancamentoService.salvar(this.lancamento);
  }

  atualizarLancamento() {
    this.lancamento = this.formLancamento.value;
    console.log(this.id);
    this.lancamentoService.atualizar(this.id, this.lancamento);
  }





  buscar(id: number) {
    this.lancamentoService.buscar(id).subscribe(data => {
      this.lancamento = data;
      this.formulario(this.lancamento);
    });


  }

  get descricao() { return this.formLancamento.get('descricao'); }

  get tipo() { return this.formLancamento.get('tipo'); }

  get valor() { return this.formLancamento.get('valor'); }


  get vencimento() { return this.formLancamento.get('vencimento'); }


}
