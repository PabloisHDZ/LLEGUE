import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-padre',
  templateUrl: './home-padre.page.html',
  styleUrls: ['./home-padre.page.scss'],
  standalone: false
})
export class HomePadrePage implements OnInit {
 personaAutorizada: any = null;
  estudiantesGrouped: { [key: string]: any[] } = {};
  estudiantes: any[] = [];
  error: string = '';
  token: string | null = null;
  loading: boolean = false;
  personaAutorizadaErrorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.token = this.authService.getToken();
    await this.loadPersonaAutorizada();
  }

  async loadPersonaAutorizada() {
    this.loading = true;
    this.error = '';

    try {
      const res = await axios.get('http://localhost:1337/api/personas-autorizadas', {
        params: {'pagination[pageSize]':100, populate: '*'},
        headers:{Authorization: `Bearer ${this.token}`}
      })

      if (!Array.isArray(res.data.data)){
         this.personaAutorizadaErrorMessage = 'La respuesta no es un arreglo';
        this.personaAutorizada=[];
        return;
      }

      const loggedUser = await this.authService.getCurrentUser();
      if (!loggedUser) {
        this.error = 'No se encontró una persona autorizada vinculada a este usuario.';
        return;
      }

      this.personaAutorizada=res.data.data.map((item:any)=>{
        const p = item.attributes || item;
        return {
          id: item.id,
          nombre: p.nombre || 'Sin nombre',
          user_permissions_user:{
            id:p.users_permissions_user?.data?.id || null,
            username: p.user_permissions_user?.data?.attributes?.username || null
          },
            estudiantes:p.estudiantes || [],
            Credencial:p.Credencial
          };
        
      });

      console.log('Usuario logueado:', loggedUser);
      console.log('Persona Autorizada:', this.personaAutorizada)


      this.personaAutorizada = loggedUser.personas_autorizada || null;

    
      if (!this.personaAutorizada){
        this.error='No se encontro una persona autorizada asociada al usuario actual';
      this.estudiantesGrouped={};
      return;
      }


      const grouped: { [key: string]: any[] } = {};
      this.personaAutorizada.estudiantes.forEach((estudiante: any) => {
        const grado = estudiante.grado || 'Sin Grado';
        const grupo = estudiante.grupo || 'Sin Grupo';
        const key = `Grupo ${grupo} - ${grado}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(estudiante);
      });

   const orderedKeys = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
      const orderedGrouped: { [key: string]: any[] } = {};
      orderedKeys.forEach(k => { orderedGrouped[k] = grouped[k]; });
      this.estudiantesGrouped = orderedGrouped;

    } catch (err:any) {
      console.error('Error cargando persona autorizada:', err);
      this.error = 'Ocurrió un error al cargar los datos';
      this.personaAutorizada=null;
      this.estudiantesGrouped={};
    } finally {
      this.loading = false;
    }
  }

  cerrarSesion() {
    console.log('Cerrar sesión');
    this.authService.clearToken(); // Elimina token guardado
    this.router.navigate(['/login']);
  }
getFotoUrl(estudiante: any): string {
  if (estudiante?.foto?.url) {
    return `http://localhost:1337${estudiante.foto.url}`;
  }
  return 'assets/user.jpg'; // Imagen genérica si no hay foto
}



}