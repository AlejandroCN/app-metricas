import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ListaMetricasComponent } from './lista-metricas.component';

@NgModule({
  declarations: [ListaMetricasComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ListaMetricasComponent],
})
export class ListaMetricasModule { }
