import { Component, OnInit } from '@angular/core';
import { RegistroMetricas } from '../../models/registro-metricas';

import { MetricasService } from '../../services/metricas.service';

@Component({
  selector: 'app-ver-resultados',
  templateUrl: './ver-resultados.page.html',
  styleUrls: ['./ver-resultados.page.scss'],
})
export class VerResultadosPage implements OnInit {

  public registrosMetricas: RegistroMetricas[];

  constructor(private metricasService: MetricasService) { }

  ngOnInit() {
    this.registrosMetricas = this.metricasService.obtenerTodasLasMetricas();
  }

}
