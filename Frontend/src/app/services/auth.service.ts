import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private baseUrl='http://localhost:1337/api/auth';

  constructor(private http: HttpClient){}

  async login(identifier: string, password: string) {
    const response = await axios.post(`${this.apiUrl}/auth/local`, {
      identifier,
      password
    });
    const { jwt } = response.data;
    localStorage.setItem('token', jwt);

    // Obtener usuario actual para guardar el rol
    const userResponse = await this.getCurrentUser();
    const roleName = userResponse.role?.name || null; // Ajusta según cómo venga el rol
    if (roleName) {
      localStorage.setItem('userRole', roleName);
    }

    return jwt;
  }

getCurrentUser(): Promise<any> {
  const token = this.getToken();

  return axios.get('http://localhost:1337/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      populate: {
        docente: {
          populate: {
            estudiantes: {
              populate: ['foto'] // Foto de cada estudiante del docente
            },
            foto: true // Foto del docente
          }
        },
        personas_autorizada: {
          populate: {
            estudiantes: {
              populate: ['foto'] // Foto de cada estudiante del tutor
            },
            Credencial: true // Imagen del documento de autorización
          }
        },
        role: true
      }
    }
  }).then(res => {
    const data = res.data;

    // ✅ LOG actualizado para Strapi v5 (sin .attributes)
    if (
      data.personas_autorizada &&
      Array.isArray(data.personas_autorizada.estudiantes)
    ) {
      console.log('🧾 Estudiantes asignados a persona autorizada:');
      data.personas_autorizada.estudiantes.forEach((est: any, index: number) => {
        const fotoUrl = est?.foto?.url;
        console.log(
          ` ${index + 1}. ${est.nombre} - Foto:`,
          fotoUrl ? `http://localhost:1337${fotoUrl}` : '❌ No tiene foto'
        );
      });
    } else {
      console.warn('⚠️ No hay estudiantes o foto en persona autorizada');
    }

    return data;
  });
}






  getToken() {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout() {
    localStorage.clear();
  }

async getUsuarios() {
  const token = this.getToken();
  const response = await axios.get(`${this.apiUrl}/users?populate=role`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}




  // Obtener personas autorizadas
  getPersonasAutorizadas() {
    return this.http.get<any[]>(`${this.baseUrl}/personas-autorizadas`).toPromise();
  }

  // Eliminar usuario por id
  eliminarUsuario(usuarioId: string) {
    return this.http.delete(`${this.baseUrl}/${usuarioId}`).toPromise();
  }

  // Actualizar estado de usuario (activo/inactivo)
  actualizarEstadoUsuario(usuarioId: string, activo: boolean) {
    return this.http.patch(`${this.baseUrl}/${usuarioId}`, { activo }).toPromise();
  }


async actualizarRolUsuario(id: string, roleId: number) {
  const token = this.getToken();

  return this.http.put(`${this.apiUrl}/user-role/${id}`, { role: roleId }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).toPromise();
}


// AuthService
clearToken() {
  localStorage.removeItem('token'); // O sessionStorage según donde guardes el token
  // Opcional: limpiar otros datos relacionados con el usuario
}


}








