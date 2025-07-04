import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePadrePageRoutingModule } from './home-padre-routing.module';

import { HomePadrePage } from './home-padre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePadrePageRoutingModule
  ],
  declarations: [HomePadrePage]
})
export class HomePadrePageModule {}
