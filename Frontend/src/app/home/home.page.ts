import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EstudiantesService } from '../services/estudiantes.service';
import { PersonasAutorizadasService } from '../services/personas-autorizadas.service';
import { DocentesService } from '../services/docentes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  
    userRole: string | null = null;

  
  estudiantesAsignados: any[] = [];
  personaAutorizadaActiva: boolean = true; 

  
  estudiantesDocente: any[] = [];
  docentes: any[]=[];
  historialEntregas: any[] = [];
  filtroEstudianteId: string = '';
  historialEntregasFiltrado: any[] = [];


  usuarios: any[] = [];
  avisosActivos: any[] = [];
  avisosFiltrados: any[] = [];

  gradosDisponibles: string[] = [];
  estudiantes: any[] = [];
  personasAutorizadas: any[] = [];

 token: string | null = '';


  rolesMap: { [key: number]: string } = {
    1: 'Administrador',
    2: 'Docente',
    3: 'Persona Autorizada'
  };

  constructor(
    private estudianteService: EstudiantesService,
      private estudiantesService: EstudiantesService,
    private personasAutorizadasService: PersonasAutorizadasService,
    private docentesService: DocentesService,
        private authService: AuthService,
        private router: Router

  ) {}

  async ngOnInit() {
    this.userRole = this.authService.getUserRole();

     if (this.userRole === 'Personas Autorizadas') {
      await this.cargarDatosPersonaAutorizada();
    } else if (this.userRole === 'Docente') {
      await this.cargarDatosDocente();
    } else if (this.userRole === 'Authenticated') {
      await this.cargarDatosAdministrador();
    }
  }




  async cargarDatosPersonaAutorizada() {
  this.estudiantesAsignados = (await this.estudianteService.getEstudiantesPorPersonaAutorizada()) ?? [];


  
    this.personaAutorizadaActiva = true; 
  }





async cargarDatosDocente() {
  this.estudiantesDocente = (await this.estudianteService.getEstudiantesPorDocente()) ?? [];


  this.historialEntregasFiltrado = [...this.historialEntregas];
}



async cargarDatosAdministrador() {
  this.usuarios = (await this.authService.getUsuarios()) ?? [];

  this.gradosDisponibles = (await this.estudianteService.getGradosDisponibles()) ?? [];
    await this.cargarEstudiantes();
  await this.cargarPersonasAutorizadas();
  await this.cargarDocentes();


  this.avisosFiltrados = [...this.avisosActivos];
}



  filtrarHistorial() {
    if (!this.filtroEstudianteId) {
      this.historialEntregasFiltrado = [...this.historialEntregas];
    } else {
      this.historialEntregasFiltrado = this.historialEntregas.filter(
        h => h.estudiante.id === this.filtroEstudianteId
      );
    }
  }



 async ionViewWillEnter() {
    this.token = this.authService.getToken();
    await this.cargarEstudiantes();
  }

  async ionViewWillEnterr() {
    this.token = this.authService.getToken();
    await this.cargarDocentes();
  }

  async ionViewWillEnt() {
    this.token = this.authService.getToken();
    await this.cargarPersonasAutorizadas();
  }

  async cargarEstudiantes() {
    try {
      const res = await this.estudiantesService.getAll(this.token!);
      this.estudiantes = res.data?.data || [];
      console.log('Estudiantes cargados:', this.estudiantes);
    } catch (error) {
      console.error('Error al cargar estudiantes', error);
    }
  }

async cargarPersonasAutorizadas() {
  try {
 const res = await this.personasAutorizadasService.getAll(this.token!);
this.personasAutorizadas = res.data ?? []
    console.log('Personas autorizadas cargadas:', this.personasAutorizadas);
  } catch (error) {
    console.error('Error al cargar personas autorizadas', error);
  }
}


async cargarDocentes() {
  try {
    const res = await this.docentesService.getAll(this.token!);
    this.docentes = res.data ?? [];
    console.log('Docentes cargados:', this.docentes);
  } catch (error) {
    console.error('Error al cargar personas autorizadas', error);
  }
}




async cerrarSesion() {
  console.log('Cerrar sesión');
  await this.authService.logout(); 
  this.router.navigate(['/login'], { replaceUrl: true }); 
}



}