import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAutorizadoPageRoutingModule } from './perfil-autorizado-routing.module';

import { PerfilAutorizadoPage } from './perfil-autorizado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAutorizadoPageRoutingModule
  ],
  declarations: [PerfilAutorizadoPage]
})
export class PerfilAutorizadoPageModule {}
