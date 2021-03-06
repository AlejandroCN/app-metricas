import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CodigosService } from '../../services/codigos.service';
import { ModalCodigoComponent } from '../../components/modal-codigo/modal-codigo.component';

import { Codigo } from '../../models/codigo.model';

@Component({
  selector: 'app-listar-programas',
  templateUrl: './listar-programas.page.html',
  styleUrls: ['./listar-programas.page.scss'],
})
export class ListarProgramasPage implements OnInit {

  public codigos: Observable<Codigo[]>

  @ViewChild(IonList, { static: true }) ionList: IonList;

  constructor(private codigosService: CodigosService,
              private modalController: ModalController) {}

  ngOnInit(): void {
    this.codigos = this.codigosService.obtenerCodigosDisponibles();
  }

  async verCodigoFuente(codigo: Codigo): Promise<any> {
    const modal = await this.modalController.create({
      component: ModalCodigoComponent,
      componentProps: {
        nombrePrograma: codigo.nombre,
        rutaCodigoFuente: codigo.ruta
      }
    });

    await modal.present();
    this.ionList.closeSlidingItems();
  }

}
