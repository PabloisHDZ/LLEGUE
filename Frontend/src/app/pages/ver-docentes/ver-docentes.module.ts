import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerDocentesPageRoutingModule } from './ver-docentes-routing.module';

import { VerDocentesPage } from './ver-docentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerDocentesPageRoutingModule
  ],
  declarations: [VerDocentesPage]
})
export class VerDocentesPageModule {}
