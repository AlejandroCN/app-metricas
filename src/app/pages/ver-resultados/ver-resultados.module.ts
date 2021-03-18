import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { VerResultadosPageRoutingModule } from './ver-resultados-routing.module';
import { HeaderModule } from '../../components/header/header.module';
import { ListaMetricasModule } from '../../components/lista-metricas/lista-metricas.module';

import { VerResultadosPage } from './ver-resultados.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VerResultadosPageRoutingModule,
    HeaderModule,
    ListaMetricasModule
  ],
  declarations: [VerResultadosPage]
})
export class VerResultadosPageModule {}
