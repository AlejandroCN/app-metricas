import { Component, OnInit } from '@angular/core';
import { CodigosService } from '../../services/codigos.service';
import { Observable } from 'rxjs';

import { Codigo } from '../../models/codigo.model';

@Component({
  selector: 'app-calcular-metricas',
  templateUrl: './calcular-metricas.page.html',
  styleUrls: ['./calcular-metricas.page.scss'],
})
export class CalcularMetricasPage implements OnInit {

  public codigos: Observable<Codigo[]>

  constructor(private codigosService: CodigosService) {}

  ngOnInit() {
    this.codigos = this.codigosService.obtenerCodigosDisponibles();
  }

}
