import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialAvisosAutorizadoPageRoutingModule } from './historial-avisos-autorizado-routing.module';

import { HistorialAvisosAutorizadoPage } from './historial-avisos-autorizado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialAvisosAutorizadoPageRoutingModule
  ],
  declarations: [HistorialAvisosAutorizadoPage]
})
export class HistorialAvisosAutorizadoPageModule {}
