import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertasDocentePageRoutingModule } from './alertas-docente-routing.module';

import { AlertasDocentePage } from './alertas-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertasDocentePageRoutingModule
  ],
  declarations: [AlertasDocentePage]
})
export class AlertasDocentePageModule {}
