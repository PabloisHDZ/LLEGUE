import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StrapiService } from '../../services/strapi.service'; // ajusta ruta según estructura

@Component({
  selector: 'app-historial-avisos',
  standalone: true,
  imports: [IonicModule, CommonModule],
providers: [DatePipe],
  templateUrl: './historial-avisos.page.html',
  styleUrls: ['./historial-avisos.page.scss'],
})
export class HistorialAvisosPage implements OnInit {

  avisos: any[] = [];
  cargando = true;

  constructor(private strapiService: StrapiService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.cargarAvisos();
  }

  cargarAvisos() {
    this.strapiService.getAvisos().subscribe({
      next: (respuesta: any) => {
              console.log('Respuesta de Strapi:', respuesta);
        this.avisos = respuesta.data.map((item: any) => {
  return {
    id: item.id,
    titulo: 'LLEGUE',
    mensaje: 'He llegado por el estudiante',
    estado: item.estado_estudiante || 'Desconocido',
    estudiante: item.estudiante?.nombre || null,
    persona_autorizada: item.personas_autorizada?.nombre || null,
    createdAt: item.fecha_hora || null,  // Fecha de creación (llegada)
    fechaEntrega: item.fecha_entrega || null  // <-- Agregamos este campo
  };
});
console.log('Avisos procesados:', this.avisos);

        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar avisos', error);
        this.cargando = false;
      }
    });
  }
}
