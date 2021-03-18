import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

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
  private loading: any;

  constructor(private activatedRoute: ActivatedRoute,
              private metricasService: MetricasService,
              private codigosService: CodigosService,
              private loadingController: LoadingController,
              private toastController: ToastController) {
    this.cargando().then(() => {
      this.activatedRoute.params.subscribe(params => {
        this.metricas = this.metricasService.obtenerMetricasPorCodigoId(params.id);
        !this.metricas ? this.analizarCodigo(params.id) : this.loading.dismiss();
      });
    });
  }

  ngOnInit() {
  }

  private async cargando(): Promise<void> {
    this.loading = await this.loadingController.create({
      message: 'Cargando'
    });

    await this.loading.present();
  }
  
  private async analizarCodigo(codigoId: number): Promise<void> {
    const analizador = new AnalizadorMetricas();
    this.metricas = new RegistroMetricas();
    this.metricas.codigoId = codigoId;

    const codigoFuente = await this.codigosService.obtenerCodigoPorId(codigoId);
    const analizadorLexico = new AnalizadorLexico(codigoFuente);
    const tokens = analizadorLexico.analizarCodigo();
    
    this.metricas.metricasBasicas = analizador.obtenerMetricasBasicas(tokens);
    this.metricas.metricasDerivadas = analizador.obtenerMetricasDerivadas(this.metricas.metricasBasicas);
    this.loading.dismiss();
  }

  public guardarResultados(): void {
    this.metricasService.guardarRegistroMetricas(this.metricas);
    this.toastSuccess();
  }

  private async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Métricas guardadas correctamente!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
