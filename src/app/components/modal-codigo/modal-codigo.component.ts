import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CodigosService } from '../../services/codigos.service';

@Component({
  selector: 'app-modal-codigo',
  templateUrl: './modal-codigo.component.html',
  styleUrls: [],
})
export class ModalCodigoComponent implements OnInit {

  @Input() public nombrePrograma: string;
  @Input() public rutaCodigoFuente: string;

  public codigoFuente: string;

  constructor(private modalCtrl: ModalController,
              private codigosService: CodigosService) { }

  ngOnInit(): void {
    this.codigosService.obtenerCodigo(this.rutaCodigoFuente).subscribe(codigo => {
      this.codigoFuente = codigo;
    }, err => {
      console.log(err);
    });
  }

  public cerrarModal(): void {
    this.modalCtrl.dismiss();
  }

}
