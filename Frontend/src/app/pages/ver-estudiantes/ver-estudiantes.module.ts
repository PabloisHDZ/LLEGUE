import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerEstudiantesPageRoutingModule } from './ver-estudiantes-routing.module';

import { VerEstudiantesPage } from './ver-estudiantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerEstudiantesPageRoutingModule
  ],
  declarations: [VerEstudiantesPage]
})
export class VerEstudiantesPageModule {}
