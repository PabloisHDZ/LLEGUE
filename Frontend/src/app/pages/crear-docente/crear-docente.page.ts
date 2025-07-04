import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DocentesService } from '../../services/docentes.service';
import { AuthService } from '../../services/auth.service';

@Component({
selector: 'app-crear-docente',
templateUrl: './crear-docente.page.html',
styleUrls: ['./crear-docente.page.scss'],
standalone: false
})
export class CrearDocentePage {
nombre = '';
token: string | null = '';

constructor(
private docentesService: DocentesService,
private authService: AuthService,
private alertCtrl: AlertController,
private navCtrl: NavController
) {}

async ionViewWillEnter() {
this.token = this.authService.getToken();
}

async guardar() {
if (!this.nombre) {
const alert = await this.alertCtrl.create({
header: 'Error',
message: 'El campo nombre es obligatorio.',
buttons: ['OK']
});
await alert.present();
return;
}try {
  const user = await this.authService.getCurrentUser();

  const data = {
    nombre: this.nombre,
    users_permissions_user: user.id
  };

  await this.docentesService.create(data, this.token!);

  const alert = await this.alertCtrl.create({
    header: 'Éxito',
    message: 'Docente registrado correctamente.',
    buttons: ['OK']
  });
  await alert.present();

  this.navCtrl.navigateRoot('/admin-dashboard');
} catch (error: any) {
  console.error('Error al guardar docente:', error);
  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: 'Hubo un problema al guardar el docente.',
    buttons: ['OK']
  });
  await alert.present();
}
}
}