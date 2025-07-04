import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  identifier = '';
  password = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async login() {
    try {
      // 1. Login y guardar token
      await this.authService.login(this.identifier, this.password);

      // 2. Obtener usuario actual con su rol
      const user = await this.authService.getCurrentUser();
      const role = user.role?.name;
      console.log('Rol recibido:', role);

      // 3. Redirigir según el rol
      if (role === 'Authenticated') {
        this.navCtrl.navigateRoot('/admin-dashboard');
      } else if (role === 'Personas Autorizadas') {
        this.navCtrl.navigateRoot('/home-padre');
      } else if (role === 'Docente') {
        this.navCtrl.navigateRoot('/home-docente');
      } else {
        throw new Error(`Rol no reconocido: ${role}`);
      }

    } catch (error: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.message || 'Credenciales inválidas',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
