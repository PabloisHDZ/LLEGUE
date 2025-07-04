import { Component } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { AuthService } from '../../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
selector: 'app-ver-estudiantes',
templateUrl: './ver-estudiantes.page.html',
styleUrls: ['./ver-estudiantes.page.scss'],
standalone: false
})
export class VerEstudiantesPage {
estudiantes: any[] = [];
token: string | null = '';

constructor(
private estudiantesService: EstudiantesService,
private authService: AuthService,
private navCtrl: NavController,
private alertCtrl: AlertController
) {}

async ionViewWillEnter() {
this.token = this.authService.getToken();
await this.cargarEstudiantes();
}

async cargarEstudiantes() {
try {
const res = await this.estudiantesService.getAll(this.token!);
this.estudiantes = res.data?.data || [];
console.log('Estudiantes cargados:', this.estudiantes);
} catch (error) {
console.error('Error al cargar estudiantes', error);
}
}

async deleteEstudiante(id: number) {
const alert = await this.alertCtrl.create({
header: 'Confirmar',
message: '¿Estás seguro de que deseas eliminar este estudiante?',
buttons: [
{ text: 'Cancelar', role: 'cancel' },
{
text: 'Eliminar',
handler: async () => {
try {
await this.estudiantesService.delete(id, this.token!);
await this.cargarEstudiantes();
} catch (error) {
console.error('Error al eliminar estudiante', error);
}
},
},
],
});
await alert.present();
}
}