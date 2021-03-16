import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { VerResultadosPageRoutingModule } from './ver-resultados-routing.module';
import { HeaderModule } from '../../components/header/header.module';

import { VerResultadosPage } from './ver-resultados.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VerResultadosPageRoutingModule,
    HeaderModule
  ],
  declarations: [VerResultadosPage]
})
export class VerResultadosPageModule {}
