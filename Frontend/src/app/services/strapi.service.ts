import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  private baseUrl = `${environment.apiUrl}/avisos`;  // <-- Asegúrate que apiUrl esté en environments

  constructor(private http: HttpClient) { }

  getAvisos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?populate=estudiante,personas_autorizada`);
  }

  crearAviso(datosAviso: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, {
      data: datosAviso
    });
  }

  actualizarEstadoAviso(avisoId: string, estado: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${avisoId}`, {
      data: { estado_estudiante: estado }
    });
  }

}
