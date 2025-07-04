import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEstudiantePageRoutingModule } from './crear-estudiante-routing.module';

import { CrearEstudiantePage } from './crear-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearEstudiantePageRoutingModule
  ],
  declarations: [CrearEstudiantePage]
})
export class CrearEstudiantePageModule {}
