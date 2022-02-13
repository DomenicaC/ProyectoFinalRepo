import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaGeneralPageRoutingModule } from './mapa-general-routing.module';

import { MapaGeneralPage } from './mapa-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaGeneralPageRoutingModule
  ],
  declarations: [MapaGeneralPage]
})
export class MapaGeneralPageModule {}
