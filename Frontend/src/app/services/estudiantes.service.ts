import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = `${environment.apiUrl}/estudiantes`;

  constructor() {}

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
}