import { Component, OnInit } from '@angular/core';
import { AvisosService } from '../../services/avisos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listado-estudiantes-autorizado',
  templateUrl: './listado-estudiantes-autorizado.page.html',
  styleUrls: ['./listado-estudiantes-autorizado.page.scss'],
  standalone: false
})
export class ListadoEstudiantesAutorizadoPage implements OnInit {
  estudiantes: any[] = [];
  personaAutorizada: any = {
    id: '123',          
    nombre: 'Autorizado Ejemplo'
  };
  loading = true;
  error = '';

  constructor(
    private avisosService: AvisosService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarEstudiantes();
  }

  async cargarEstudiantes() {
    try {
      this.loading = true;
      this.error = '';

      // Simulación de llamada a backend: reemplaza esto por tu llamada real a Strapi
      this.estudiantes = [
        { id: 1, nombre: 'Juan Pérez', grado: '3', grupo: 'A' },
        { id: 2, nombre: 'Ana Gómez', grado: '3', grupo: 'A' },
      ];

      this.loading = false;
    } catch (e) {
      this.error = 'Error cargando estudiantes';
      this.loading = false;
    }
  }

  async enviarAviso(estudiante: any) {
    try {
      await this.avisosService.crearAviso({
        estudianteId: estudiante.id,
        estudianteNombre: estudiante.nombre,
        personaAutorizadaId: this.personaAutorizada?.id,
        personaAutorizadaNombre: this.personaAutorizada?.nombre,
        mensaje: 'La persona autorizada ha llegado',
        estado: 'Entregado',
        fecha: new Date().toISOString()
      });

      const alert = await this.alertController.create({
        header: 'Aviso enviado',
        message: `Se ha enviado el aviso para ${estudiante.nombre}`,
        buttons: ['OK']
      });

      await alert.present();
    } catch (error) {
      console.error('Error al enviar el aviso', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo enviar el aviso.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
