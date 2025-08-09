import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoEstudiantesAutorizadoPageRoutingModule } from './listado-estudiantes-autorizado-routing.module';

import { ListadoEstudiantesAutorizadoPage } from './listado-estudiantes-autorizado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoEstudiantesAutorizadoPageRoutingModule
  ],
  declarations: [ListadoEstudiantesAutorizadoPage]
})
export class ListadoEstudiantesAutorizadoPageModule {}
