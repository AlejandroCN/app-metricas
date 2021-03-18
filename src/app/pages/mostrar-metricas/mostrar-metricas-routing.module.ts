import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarMetricasPage } from './mostrar-metricas.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarMetricasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarMetricasPageRoutingModule {}
