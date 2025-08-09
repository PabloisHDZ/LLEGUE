import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialAvisosDocentePageRoutingModule } from './historial-avisos-docente-routing.module';

import { HistorialAvisosDocentePage } from './historial-avisos-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialAvisosDocentePageRoutingModule
  ],
  declarations: [HistorialAvisosDocentePage]
})
export class HistorialAvisosDocentePageModule {}
