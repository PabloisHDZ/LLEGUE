import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PersonasAutorizadasService } from '../../services/personas-autorizadas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: false
})
export class AdminDashboardPage {
  personas: any[] = [];
  token: string | null = '';

  constructor(
    private personasService: PersonasAutorizadasService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.token = this.authService.getToken();
    await this.loadPersonas();
  }
  
async loadPersonas() {
  try {
    const res = await this.personasService.getAll(this.token!);
    this.personas = res.data.data;
    console.log('Personas cargadas:', this.personas);
  } catch (error) {
    console.error('Error al cargar personas:', error);
  }
}


  async deletePersona(id: number) {
    const confirm = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estás seguro de eliminar esta persona autorizada?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.personasService.delete(id, this.token!);
            this.loadPersonas();
          }
        }
      ]
    });
    await confirm.present();
  }
}
