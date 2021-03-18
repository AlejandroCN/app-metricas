import { Component, Input, OnInit } from '@angular/core';

import { RegistroMetricas } from '../../models/registro-metricas';

@Component({
  selector: 'app-lista-metricas',
  templateUrl: './lista-metricas.component.html',
  styleUrls: [],
})
export class ListaMetricasComponent implements OnInit {

  @Input() public metricas: RegistroMetricas;

  constructor() { }

  ngOnInit() {}

}
