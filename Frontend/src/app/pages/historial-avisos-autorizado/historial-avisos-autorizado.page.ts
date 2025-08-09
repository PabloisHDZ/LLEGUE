import { Component, OnInit } from '@angular/core';
import { AvisosService } from 'src/app/services/avisos.service';

@Component({
  selector: 'app-historial-avisos-autorizado',
  templateUrl: './historial-avisos-autorizado.page.html',
  styleUrls: ['./historial-avisos-autorizado.page.scss'],
  standalone: false
})
export class HistorialAvisosAutorizadoPage implements OnInit {
  cargando = true;
  avisos: any[] = [];
  error: string | null = null;

  constructor(private avisosService: AvisosService) {}

  ngOnInit() {
    this.cargarAvisos();
  }

  // usa ionViewWillEnter si quieres recargar al volver a la página
  async cargarAvisos() {
    this.cargando = true;
    this.error = null;

    this.avisosService.getAvisos().subscribe({
      next: (res: any) => {
        console.log('Respuesta getAvisos:', res); // ← revisa aquí en consola
        if (!res) {
          this.error = 'Respuesta vacía del servidor';
          this.cargando = false;
          return;
        }

       const items = res.data ?? res;
if (!Array.isArray(items)) {
  this.error = 'Formato inesperado de respuesta';
  this.cargando = false;
  return;
}

this.avisos = items.map((it: any) => {
  const attrs = it.attributes ?? it;
  const estudianteName = attrs.estudiante?.data?.attributes?.nombre
    || attrs.estudiante?.nombre
    || attrs.estudiante;

  const autorizadoName = attrs.personas_autorizada?.data?.attributes?.nombre
    || attrs.personas_autorizada?.nombre
    || attrs.personas_autorizada;

  return {
    id: it.id,
    titulo: attrs.titulo ?? attrs.mensaje ?? 'Aviso',
    mensaje: attrs.mensaje ?? '',
    estado: attrs.estado_estudiante ?? '',
    estudiante: estudianteName ?? 'No disponible',
    persona_autorizada: autorizadoName ?? 'No disponible',
    createdAt: attrs.createdAt ?? attrs.fecha_hora ?? null,
    fechaEntrega: attrs.fechaEntrega ?? attrs.fecha_entrega ?? null
  };
});

        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error cargando avisos:', err);
        // show more details if backend gives message
        this.error = err?.message || 'Error al cargar avisos';
        this.cargando = false;
      }
    });
  }
}
