import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ListarProgramasPageRoutingModule } from './listar-programas-routing.module';
import { ListarProgramasPage } from './listar-programas.page';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListarProgramasPageRoutingModule,
    HeaderModule
  ],
  declarations: [ListarProgramasPage]
})
export class ListarProgramasPageModule {}
