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
    '[', ']', '(', ')', '<-', '->', '<', '>', '<=', '>=', '=', '<>', '+', '-', '*', '/', ';', '"', ',',
    'y', 'o', 'nel', 'cad'
  ];

  private operadoresComplementarios = ['fin_declara', 'fin_principal', 'fin_funciones', 'fin_itera',
    'entonces', 'fin_verdad', 'fin_funcion', ')', ']'];

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

    // del arreglo de tokens y lexemas solo rescatamos los lexemas y los tokens que sean cadenas
    tokens = tokens.filter((tok, index) => (index % 2 !== 0 && !this.operadoresComplementarios.includes(tok)) || tok === 'cad');
    tokens.forEach((token) => {
      if (this.catalogoOperadores.includes(token)) {
        if (token === ';' && this.operadoresComplementarios.includes(operadores[operadores.length - 1])) {
          return;
        }
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

  public obtenerMetricasDerivadas(basicas: MetricasBasicas): MetricasDerivadas {
    const derivadas = new MetricasDerivadas();
    derivadas.N = basicas.N1 +  basicas.N2;
    derivadas.n = basicas.n1 +  basicas.n2;
    derivadas.V = Number((derivadas.N * Math.log2(derivadas.n)).toFixed(2));
    derivadas.D = Number(((basicas.n1 / 2) * (basicas.N2 / basicas.n2)).toFixed(2));
    derivadas.L = Number((1 / derivadas.D).toFixed(2));
    derivadas.E = Number((derivadas.D * derivadas.V).toFixed(2));
    derivadas.T = Number((derivadas.E / 18).toFixed(2));
    derivadas.B = Number((Math.pow(derivadas.E, 2 / 3) / 3000).toFixed(2));

    return derivadas;
  }

}