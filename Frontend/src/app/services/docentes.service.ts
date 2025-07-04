import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  private apiUrl = `${environment.apiUrl}/docentes`;

  constructor() {}

  // GET: Listar todos los docentes
  getAll(token: string) {
    return axios.get(`${this.apiUrl}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // GET: Obtener un docente por ID
  getById(id: number, token: string) {
    return axios.get(`${this.apiUrl}/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // POST: Crear docente
  create(data: any, token: string) {
    return axios.post(this.apiUrl, { data }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // PUT: Editar docente
  update(id: number, data: any, token: string) {
    return axios.put(`${this.apiUrl}/${id}`, { data }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // DELETE: Eliminar docente
  delete(id: number, token: string) {
    return axios.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
