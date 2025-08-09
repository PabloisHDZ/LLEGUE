import { Component, OnInit } from '@angular/core';
import { AvisosService } from 'src/app/services/avisos.service';

@Component({
  selector: 'app-avisar-llegada',
  templateUrl: './avisar-llegada.page.html',
  styleUrls: ['./avisar-llegada.page.scss'],
  standalone: false

})
export class AvisarLlegadaPage {


  constructor(private avisosService: AvisosService) {}

  avisarLlegada() {
  const datosAviso = {
    fecha_hora: new Date().toISOString(),
    fecha_entrega: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(), // entrega en 1h
    estado_estudiante: 'en camino',
    estudiante: 1, // ID en Strapi
    personas_autorizada: 2, // ID en Strapi
  };

  this.avisosService.crearAviso(datosAviso).subscribe({
    next: (res: any) => console.log('Aviso enviado:', res),
    
    error: (err: any) => console.error('Error enviando aviso:', err)
  });
}


}

