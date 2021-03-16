import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'calcular-metricas',
    loadChildren: () => import('./pages/calcular-metricas/calcular-metricas.module').then( m => m.CalcularMetricasPageModule)
  },
  {
    path: 'ver-resultados',
    loadChildren: () => import('./pages/ver-resultados/ver-resultados.module').then( m => m.VerResultadosPageModule)
  },
  {
    path: 'creditos',
    loadChildren: () => import('./pages/creditos/creditos.module').then( m => m.CreditosPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
