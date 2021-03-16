import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalCodigoComponent } from './modal-codigo.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ModalCodigoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ModalCodigoComponent]
})
export class ModalCodigoModule { }
