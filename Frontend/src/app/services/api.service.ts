import { Injectable } from '@angular/core';
import axios from 'axios'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService { private baseUrl= 'https://localhost:1337/api'; 

  constructor() { }

async getUsers() {
  const res= await axios.get(`${this.baseUrl}/users`);
  return res.data;
}

  


}
