import { Injectable } from '@angular/core';
import { RegistroMetricas } from '../models/registro-metricas';

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  constructor() { }

  guardarRegistroMetricas(registro: RegistroMetricas): void {
    let registrosExistentes = this.obtenerTodasLasMetricas();
    if (!registrosExistentes) {
      registrosExistentes = [];
      registrosExistentes.push(registro);
    }
    !registrosExistentes.find(r => r.codigoId === registro.codigoId) ? registrosExistentes.push(registro) : null;
    localStorage.setItem('registrosMetricas', JSON.stringify(registrosExistentes));
  }

  obtenerMetricasPorCodigoId(id: number): RegistroMetricas {
    const registrosExistentes = this.obtenerTodasLasMetricas();
    if (registrosExistentes) {
      const registroSolicitado = registrosExistentes.find(rm => rm.codigoId === id);
      return registroSolicitado ? registroSolicitado : null;
    }
    return null;
  }

  obtenerTodasLasMetricas(): RegistroMetricas[] {
    if (localStorage.getItem(`registrosMetricas`)) {
      const registrosExistentes = JSON.parse(localStorage.getItem(`registrosMetricas`)) as RegistroMetricas[];
      return registrosExistentes;
    }
    return null;
  }

}
