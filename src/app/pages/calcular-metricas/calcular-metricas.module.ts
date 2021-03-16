import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CalcularMetricasPageRoutingModule } from './calcular-metricas-routing.module';
import { CalcularMetricasPage } from './calcular-metricas.page';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CalcularMetricasPageRoutingModule,
    HeaderModule
  ],
  declarations: [CalcularMetricasPage]
})
export class CalcularMetricasPageModule {}
