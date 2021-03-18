import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MostrarMetricasPageRoutingModule } from './mostrar-metricas-routing.module';
import { HeaderModule } from '../../components/header/header.module';

import { MostrarMetricasPage } from './mostrar-metricas.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MostrarMetricasPageRoutingModule,
    HeaderModule
  ],
  declarations: [MostrarMetricasPage]
})
export class MostrarMetricasPageModule {}
