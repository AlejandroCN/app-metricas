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

  obtenerCodigo(nombre: string): void {
    this.http.get(`${this.rutaBaseCodigos}/codigos/${nombre}.txt`, {responseType: 'text'}).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

}
