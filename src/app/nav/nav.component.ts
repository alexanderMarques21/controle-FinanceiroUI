import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  items: MenuItem[];
  ngOnInit(): void {

    this.items = [
      { label: 'Novo Lancamento', icon: 'pi pi-fw pi-plus', routerLink: '/lancamentos/novo' },
      { label: 'Listar Lançamentos', icon: 'pi pi-fw pi-list', routerLink: '/lancamentos' }
    ];
  }



  constructor() { }



}
