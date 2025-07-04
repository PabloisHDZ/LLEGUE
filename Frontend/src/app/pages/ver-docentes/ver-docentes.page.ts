import { Component } from '@angular/core';
import { DocentesService } from '../../services/docentes.service';
import { AuthService } from '../../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ver-docentes',
  templateUrl: './ver-docentes.page.html',
  styleUrls: ['./ver-docentes.page.scss'],
  standalone: false
})
export class VerDocentesPage {
  docentes: any[] = [];
  token: string | null = '';

  constructor(
    private docentesService: DocentesService,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.token = this.authService.getToken();
    await this.cargarDocentes();
  }

  async cargarDocentes() {
    try {
      const res = await this.docentesService.getAll(this.token!);
      this.docentes = res.data?.data || res.data || res;
      console.log('Docentes cargados:', this.docentes);
    } catch (error) {
      console.error('Error al cargar docentes:', error);
    }
  }

  async deleteDocente(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este docente?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.docentesService.delete(id, this.token!);
              await this.cargarDocentes();
            } catch (error) {
              console.error('Error al eliminar docente', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
