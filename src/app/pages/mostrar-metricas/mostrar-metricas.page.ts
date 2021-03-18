import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetricasService } from '../../services/metricas.service';
import { CodigosService } from '../../services/codigos.service';
import { RegistroMetricas } from '../../models/registro-metricas';
import { AnalizadorLexico } from '../../models/analizador-lexico.model';
import { AnalizadorMetricas } from '../../models/analizador-metricas.model';

@Component({
  selector: 'app-mostrar-metricas',
  templateUrl: './mostrar-metricas.page.html',
  styleUrls: [],
})
export class MostrarMetricasPage implements OnInit {

  public metricas: RegistroMetricas;

  constructor(private activatedRoute: ActivatedRoute,
              private metricasService: MetricasService,
              private codigosService: CodigosService) {
    this.activatedRoute.params.subscribe(params => {
      this.metricas = this.metricasService.obtenerMetricasPorCodigoId(params.id);
      !this.metricas ? this.analizarCodigo(params.id) : null;
    });
  }

  ngOnInit() {
  }
  
  private async analizarCodigo(codigoId: number): Promise<void> {
    const analizador = new AnalizadorMetricas();
    this.metricas = new RegistroMetricas();

    const codigoFuente = await this.codigosService.obtenerCodigoPorId(codigoId);
    const analizadorLexico = new AnalizadorLexico(codigoFuente);
    const tokens = analizadorLexico.analizarCodigo();
    
    this.metricas.metricasBasicas = analizador.obtenerMetricasBasicas(tokens);
    this.metricas.metricasDerivadas = analizador.obtenerMetricasDerivadas(this.metricas.metricasBasicas);
    console.log(tokens);
    console.log(this.metricas);
  }

}
