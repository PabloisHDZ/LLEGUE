import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = `${environment.apiUrl}/estudiantes`;
  private baseUrl = 'http://localhost:1337/api/estudiantes';
  constructor(private http: HttpClient) {}

  create(data: any, token: string) {
    return axios.post(this.apiUrl, { data }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAll(token: string) {
    return axios.get(`${this.apiUrl}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getById(id: number, token: string) {
    return axios.get(`${this.apiUrl}/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  update(id: number, data: any, token: string) {
    return axios.put(`${this.apiUrl}/${id}`, { data }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  delete(id: number, token: string) {
    return axios.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }




getEstudiantesPorPersonaAutorizada(): Promise<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/por-persona-autorizada`).toPromise()
    .then(res => res ?? []);
}


getEstudiantesPorDocente(): Promise<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/por-docente`).toPromise()
    .then(res => res ?? []);
}

getGradosDisponibles(): Promise<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/grados`).toPromise()
    .then(res => res ?? []);
}


getTodosEstudiantes(): Promise<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}`).toPromise()
    .then(res => res ?? []);
}

  // Asignar estudiante a persona autorizada
  asignarEstudianteAPersonaAutorizada(estudianteId: string, personaAutorizadaId: string) {
    return this.http.post(`${this.baseUrl}/asignar`, {
      estudianteId,
      personaAutorizadaId
    }).toPromise();
  }




}