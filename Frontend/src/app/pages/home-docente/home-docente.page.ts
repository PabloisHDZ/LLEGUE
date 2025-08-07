import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
  standalone: false
})
export class HomeDocentePage implements OnInit {
  docente: any = null;
  estudiantesGrouped: { [key: string]: any[] } = {};
  docentes: any[] = [];
  docenteErrorMessage: string = '';
  loading = false;
  error = '';
  token: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.token = this.authService.getToken();
    await this.loadDocente();
  }

  async loadDocente() {
    this.error = '';
    this.loading = true;
    this.docenteErrorMessage = '';

    try {
      const res = await axios.get('http://localhost:1337/api/docentes', {
         params: { 'pagination[pageSize]': 100, populate: '*' },
        headers: { Authorization: `Bearer ${this.token}` }
      });

      if (!Array.isArray(res.data.data)) {
        this.docenteErrorMessage = 'La respuesta no es un arreglo';
        this.docentes = [];
        return;
      }

      // Obtener usuario logueado
      const loggedUser = await this.authService.getCurrentUser();
      if (!loggedUser) {
        this.error = 'No se encontró usuario logueado';
        return;
      }

      this.docentes = res.data.data.map((item: any) => {
        const d = item.attributes || item;
        return {
          id: item.id,
          nombre: d.nombre || 'Sin nombre',
          users_permissions_user: {
            id: d.users_permissions_user?.data?.id || null,
            username: d.users_permissions_user?.data?.attributes?.username || null
          },
          estudiantes: d.estudiantes || [],
          foto: d.foto
        };
      });

      console.log('Usuario logueado:', loggedUser);
console.log('Docentes:', this.docentes);


      
     this.docente = loggedUser.docente || null;


      if (!this.docente) {
        this.error = 'No se encontró un docente asociado al usuario actual';
        this.estudiantesGrouped = {};
        return;
      }

      const grouped: { [key: string]: any[] } = {};
      this.docente.estudiantes.forEach((estudiante: any) => {
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

    } catch (err: any) {
      console.error('Error cargando docente:', err);
      this.error = 'Error cargando datos del docente';
      this.docente = null;
      this.estudiantesGrouped = {};
    } finally {
      this.loading = false;
    }
  }

  getFotoUrl(estudiante: any): string {
  if (estudiante?.foto?.url) {
    return `http://localhost:1337${estudiante.foto.url}`;
  }
  return 'assets/user.jpg'; 
}


async cerrarSesion() {
  console.log('Cerrar sesión');
  await this.authService.logout(); 
  this.router.navigate(['/login'], { replaceUrl: true }); 
}

}
