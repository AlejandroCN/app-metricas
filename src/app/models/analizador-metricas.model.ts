import { MetricasBasicas } from './metricas-basicas.model';
import { MetricasDerivadas } from './metricas-derivadas.model';

export class AnalizadorMetricas {

  private catalogoOperadores = [
    'declara', 'fin_declara',
    'principal', 'fin_principal',
    'verdad', 'entonces', 'y_si_no', 'fin_verdad',
    'itera', 'fin_itera',
    'funcion', 'fin_funcion',
    'funciones', 'fin_funciones',
    'dato', 'cadena', 'numerico',
    'escribir', 'leer', 'escribir_enter', 'mod', 'abs', 'div',
    '[', ']', '(', ')', '<-', '->', '<', '>', '<=', '>=', '=', '<>', '+', '-', '*', '/', ';', '"',
    'y', 'o', 'nel', 
  ];

  private operadoresComplementarios = ['fin_declara', 'fin_principal', 'fin_funciones', 'fin_itera',
    'entonces', 'y_si_no', 'fin_verdad', 'fin_funcion', ')', ']'];

  /**
   * Itera el arreglo de tokens, almacena sin repetición operadores y operandos en arreglos separados,
   * cuenta el total de operadores y operandos iterados con repetición y devuelve las métricas básicas.
   * @param tokens el arreglo de tokens resultante del código fuente
   * @returns un objeto con las métricas básicas: n1, N1, n2 y N2
   */
  public obtenerMetricasBasicas(tokens: string[]): MetricasBasicas {
    const operadores: string[] = [];
    const operandos: string[] = [];
    let totalOperadores = 0;
    let totalOperandos = 0;

    tokens.forEach(token => {
      if (this.catalogoOperadores.includes(token) && !this.operadoresComplementarios.includes(token)) {
        totalOperadores ++;
        !operadores.includes(token) ? operadores.push(token) : null;
      } else {
        totalOperandos ++;
        !operandos.includes(token) ? operandos.push(token) : null;
      }
    });

    return {
      n1: operadores.length,
      N1: totalOperadores,
      n2: operandos.length,
      N2: totalOperandos
    };
  }

  public obtenerMetricasDerivadas(metricasBasicas: MetricasBasicas): MetricasDerivadas {
    return null;
  }

}