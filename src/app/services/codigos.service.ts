import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Codigo } from '../models/codigo.model';

@Injectable({
  providedIn: 'root'
})
export class CodigosService {

  private rutaBaseCodigos = 'assets/data';

  constructor(private http: HttpClient) { }

  obtenerCodigosDisponibles(): Observable<Codigo[]> {
    return this.http.get(`${this.rutaBaseCodigos}/lista-codigos.json`).pipe(
      map(response => response as Codigo[])
    )
  }

  obtenerCodigo(ruta: string): Observable<string> {
    return this.http.get(ruta, {responseType: 'text'}).pipe(
      map(response => response as string)
    );
  }

  obtenerCodigoPorId(id: number): Promise<string> {
    return new Promise((res) => {
      this.obtenerCodigosDisponibles().toPromise().then(codigos => {
        const codigo = codigos.find(c => c.id === id);
        res(this.obtenerCodigo(codigo.ruta).toPromise());
      });
    });
  }

}
