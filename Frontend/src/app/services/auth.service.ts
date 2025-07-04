import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  async login(identifier: string, password: string) {
    const response = await axios.post(`${this.apiUrl}/auth/local`, {
      identifier,
      password
    });
    const { jwt } = response.data;
    localStorage.setItem('token', jwt);
    return jwt;
  }

  async getCurrentUser() {
    const token = this.getToken();
    const response = await axios.get(`${this.apiUrl}/users/me?populate=role`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
}
