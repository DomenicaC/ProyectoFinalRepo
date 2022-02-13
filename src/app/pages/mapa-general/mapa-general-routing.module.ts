import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaGeneralPage } from './mapa-general.page';

const routes: Routes = [
  {
    path: '',
    component: MapaGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaGeneralPageRoutingModule {}
