import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisarLlegadaPageRoutingModule } from './avisar-llegada-routing.module';

import { AvisarLlegadaPage } from './avisar-llegada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisarLlegadaPageRoutingModule
  ],
  declarations: [AvisarLlegadaPage]
})
export class AvisarLlegadaPageModule {}
