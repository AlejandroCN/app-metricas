import { MetricasBasicas } from "./metricas-basicas.model";
import { MetricasDerivadas } from './metricas-derivadas.model';

export class RegistroMetricas {

  public codigoId: number;
  public metricasBasicas: MetricasBasicas;
  public metricasDerivadas: MetricasDerivadas;

}