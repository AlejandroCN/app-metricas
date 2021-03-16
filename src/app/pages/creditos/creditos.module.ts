import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { CreditosPageRoutingModule } from './creditos-routing.module';
import { HeaderModule } from '../../components/header/header.module';

import { CreditosPage } from './creditos.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CreditosPageRoutingModule,
    HeaderModule
  ],
  declarations: [CreditosPage]
})
export class CreditosPageModule {}
