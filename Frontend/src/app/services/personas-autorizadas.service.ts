import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasAutorizadasService {
  private apiUrl = `${environment.apiUrl}/personas-autorizadas`;

  constructor() {}

  // GET: Listar todas las personas
getAll(token: string) {
  return axios.get(`${this.apiUrl}?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


  // POST: Crear persona
  create(data: any, token: string) {
    return axios.post(this.apiUrl, { data }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // PUT: Editar persona
  update(id: number, data: any, token: string) {
    return axios.put(`${this.apiUrl}/${id}`, { data }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // DELETE: Eliminar persona
  delete(id: number, token: string) {
    return axios.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // POST: Subir credencial (foto)
  uploadImage(file: File, token: string) {
    const formData = new FormData();
    formData.append('files', file);

    return axios.post(`${environment.apiUrl}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data[0]); // retorna la imagen subida
  }

  // GET: Obtener una persona por ID
  getById(id: number, token: string) {
    return axios.get(`${this.apiUrl}/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
