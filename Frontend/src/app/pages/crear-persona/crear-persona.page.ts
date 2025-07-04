import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PersonasAutorizadasService } from '../../services/personas-autorizadas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.page.html',
  styleUrls: ['./crear-persona.page.scss'],
  standalone: false
})
export class CrearPersonaPage {
  nombre = '';
  telefono = '';
  estado = 'activo';

  credencialFile: File | null = null;
  token: string | null = '';

  constructor(
    private personasService: PersonasAutorizadasService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  async ionViewWillEnter() {
    this.token = this.authService.getToken();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.credencialFile = file;
    }
  }

  async guardar() {
    if (!this.nombre || !this.telefono || !this.credencialFile) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Todos los campos y la credencial son obligatorios.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      // 1. Subir imagen
      const uploadedImage = await this.personasService.uploadImage(this.credencialFile, this.token!);
      console.log('Imagen subida:', uploadedImage);

      // ⚠️ Si el campo "Credencial" espera un arreglo, usa [uploadedImage.id]
      const data = {
        nombre: this.nombre,
        telefono: this.telefono,
        estado: this.estado,
        Credencial: uploadedImage.id // Usa [uploadedImage.id] si falla
      };

      console.log('Datos enviados a Strapi:', data);

      // 2. Crear persona autorizada
      await this.personasService.create(data, this.token!);

      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Persona registrada correctamente.',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/admin-dashboard');

    } catch (error: any) {
      console.error('Error completo:', error);

      const message =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Error desconocido';

      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: `Hubo un problema al guardar o subir la credencial: ${message}`,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
