import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private baseUrl = environment.apiUrl;  // Usamos apiUrl desde environment

  constructor(private http: HttpClient) { }

  // Obtener historial de entregas
  getHistorialEntregas(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/historial`).toPromise()
      .then(res => res ?? []);  // Si res es undefined, devuelve arreglo vacío
  }

  getAvisosActivos(): Promise<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/avisos`).toPromise()
    .then(res => res ?? []);
}


getAvisosPendientes(): Promise<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/pendientes`).toPromise()
    .then(res => res ?? []);
}

getAvisosPorPersonaAutorizada(): Promise<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/por-persona-autorizada`).toPromise()
    .then(res => res ?? []);
}

getDispositivosRegistrados(): Promise<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/dispositivos`).toPromise()
    .then(res => res ?? []);
}

  // Crear nuevo aviso
  crearAviso(aviso: any): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}`, aviso).toPromise();
  }

  // Actualizar estado de un aviso
  actualizarEstadoAviso(avisoId: string, estado: string): Promise<any> {
    return this.http.patch<any>(`${this.baseUrl}/${avisoId}`, { status: estado }).toPromise();
  }



  // Eliminar dispositivo
  eliminarDispositivo(dispositivoId: string): Promise<any> {
    return this.http.delete<any>(`${this.baseUrl}/dispositivos/${dispositivoId}`).toPromise();
  }
}
