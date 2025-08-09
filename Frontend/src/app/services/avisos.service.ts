import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  private baseUrl = environment.apiUrl || 'http://localhost:1337/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /** Obtiene headers con token */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No hay token disponible');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 📌 GETs
  getHistorialEntregas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/historial`, { headers: this.getAuthHeaders() });
  }

  getAvisosActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/avisos`, { headers: this.getAuthHeaders() });
  }

  getAvisosPendientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pendientes`, { headers: this.getAuthHeaders() });
  }

  getAvisosPorPersonaAutorizada(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/por-persona-autorizada`, { headers: this.getAuthHeaders() });
  }

  getDispositivosRegistrados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dispositivos`, { headers: this.getAuthHeaders() });
  }

  getAvisos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/avisos?populate=*`, { headers: this.getAuthHeaders() });
  }

  // 📌 POST
  crearAviso(avisoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/avisos`, avisoData, { headers: this.getAuthHeaders() });
  }

  enviarAviso(estudianteId: number): Observable<any> {
    const data = {
      data: {
        estudiante: estudianteId,
        mensaje: 'El estudiante ha llegado.',
        fecha: new Date().toISOString()
      }
    };
    return this.crearAviso(data);
  }

  // 📌 PATCH (solo cambiar estado)
  actualizarEstadoAviso(avisoId: number, estado: string): Observable<any> {
  return this.http.patch<any>(
    `${this.baseUrl}/avisos/${avisoId}`,
    { data: { estado } },
    { headers: this.getAuthHeaders() }
  );
}


  // 📌 PUT (actualizar aviso completo o campos específicos)
  actualizarAviso(aviso: any): Observable<any> {
  const dataToSend = {
    data: {
      estado: aviso.estado,
      fecha_entrega: aviso.fecha_entrega,
    }
  };
  console.log('ID usado:', aviso.id);
  return this.http.put(`${this.baseUrl}/avisos/${aviso.id}`, dataToSend, { headers: this.getAuthHeaders() });
}


  // 📌 DELETE
  eliminarDispositivo(dispositivoId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/dispositivos/${dispositivoId}`, { headers: this.getAuthHeaders() });
  }

}
