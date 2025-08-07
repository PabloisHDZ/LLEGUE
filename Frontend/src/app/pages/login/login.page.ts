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
  showPassword = false

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async login() {
    try {
     
      await this.authService.login(this.identifier, this.password);

     
      const user = await this.authService.getCurrentUser();
      const role = user.role?.name;
      console.log('Rol recibido:', role);

   
        if (role === 'Authenticated') {
        this.navCtrl.navigateRoot('/home');
      } else if (role === 'Persona Autorizada') {
        this.navCtrl.navigateRoot('/home');
      } else if (role === 'Docente') {
        this.navCtrl.navigateRoot('/home');
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

   togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ionViewWillEnter() {

    this.identifier = '';
    this.password = '';
    this.showPassword = false;
  }
  

}
