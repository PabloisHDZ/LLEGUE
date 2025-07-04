import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { DocentesService } from 'src/app/services/docentes.service';
import { PersonasAutorizadasService } from 'src/app/services/personas-autorizadas.service';


@Component({
selector: 'app-crear-estudiante',
templateUrl: './crear-estudiante.page.html',
styleUrls: ['./crear-estudiante.page.scss'],
standalone: false
})
export class CrearEstudiantePage {
nombre = '';
grado = '';
grupo = '';
docenteId: number | null = null;
personasAutorizadasIds: number[] = [];
avisosIds: number[] = [];

// docentes: any[] = [];
// personasAutorizadas: any[] = [];
// avisos: any[] = [];

token: string | null = '';

constructor(
private authService: AuthService,
private estudiantesService: EstudiantesService,
private docentesService: DocentesService,
private personasService: PersonasAutorizadasService,
private alertCtrl: AlertController,
private navCtrl: NavController
) {}

async ionViewWillEnter() {
this.token = this.authService.getToken();
// await this.cargarDocentes();
// await this.cargarPersonasAutorizadas();
// await this.cargarAvisos();
}

// async cargarDocentes() {
// const res = await this.docentesService.getAll(this.token!);
// this.docentes = res.data || res;
// }

// async cargarPersonasAutorizadas() {
// const res = await this.personasService.getAll(this.token!);
// this.personasAutorizadas = res.data || res;
// }

// async cargarAvisos() {
// const res = await this.avisosService.getAll(this.token!);
// this.avisos = res.data || res;
// }

async guardar() {
if (!this.nombre || !this.grado || !this.grupo ) {
const alert = await this.alertCtrl.create({
header: 'Error',
message: 'Todos los campos son obligatorios.',
buttons: ['OK']
});
await alert.present();
return;
}
const data = {
  nombre: this.nombre,
  grado: this.grado,
  grupo: this.grupo,
  // docente: this.docenteId,
  // personas_autorizadas: this.personasAutorizadasIds,
  // avisos: this.avisosIds
};

try {
  await this.estudiantesService.create(data, this.token!);

  const alert = await this.alertCtrl.create({
    header: 'Éxito',
    message: 'Estudiante creado correctamente.',
    buttons: ['OK']
  });
  await alert.present();

  this.navCtrl.navigateRoot('/admin-dashboard');

} catch (error) {
  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: 'Hubo un problema al guardar.',
    buttons: ['OK']
  });
  await alert.present();
}
}
}