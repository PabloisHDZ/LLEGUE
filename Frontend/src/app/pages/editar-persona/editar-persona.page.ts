import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PersonasAutorizadasService } from '../../services/personas-autorizadas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.page.html',
  styleUrls: ['./editar-persona.page.scss'],
  standalone: false
})
export class EditarPersonaPage {
  personaId!: number;
  nombre = '';
  telefono = '';
  estado = '';
  credencialFile: File | null = null;
  imagenActualUrl: string = '';
  token: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private personasService: PersonasAutorizadasService,
    private authService: AuthService
  ) {}

 ionViewWillEnter() {
  this.token = this.authService.getToken();
  this.personaId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  console.log('ID recibido en pantalla de edición:', this.personaId); // 👈
  this.cargarPersona();
}


  async cargarPersona() {
    try {
      const res = await this.personasService.getById(this.personaId, this.token!);
      const persona = res.data;

      this.nombre = persona.nombre;
      this.telefono = persona.telefono;
      this.estado = persona.estado;

      if (persona.Credencial?.url) {
        this.imagenActualUrl = 'http://localhost:1337' + persona.Credencial.url;
      }
    } catch (error) {
      console.error('Error al cargar persona:', error);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.credencialFile = file;
    }
  }

  async guardarCambios() {
    if (!this.nombre || !this.telefono || !this.estado) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      let credencialId;

      if (this.credencialFile) {
        const imagenSubida = await this.personasService.uploadImage(this.credencialFile, this.token!);
        credencialId = imagenSubida.id;
      }

      const data: any = {
        nombre: this.nombre,
        telefono: this.telefono,
        estado: this.estado
      };

      if (credencialId) {
        data.Credencial = credencialId;
      }

      await this.personasService.update(this.personaId, data, this.token!);

      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Persona actualizada correctamente.',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/admin-dashboard');

    } catch (error) {
      console.error('Error al actualizar:', error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un problema al actualizar la persona.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
