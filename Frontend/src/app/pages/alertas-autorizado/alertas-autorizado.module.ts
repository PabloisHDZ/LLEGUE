import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertasAutorizadoPageRoutingModule } from './alertas-autorizado-routing.module';

import { AlertasAutorizadoPage } from './alertas-autorizado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertasAutorizadoPageRoutingModule
  ],
  declarations: [AlertasAutorizadoPage]
})
export class AlertasAutorizadoPageModule {}
