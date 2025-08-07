import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: false
})
export class AdminDashboardPage implements OnInit {
 token: string | null = null;


  users: any[] = [];
  errorMessage: string = '';
  roles: any[] = [];
  selectedSegment: 'usuarios' | 'personas' | 'docentes' | 'estudiantes' = 'usuarios';


  editingUser: any = null; 
  showCreateForm: boolean = false;

  newUser: any = {
    username: '',
    email: '',
    password: '',
    roleId: null
  };


  personas: any[] = [];
  personaErrorMessage: string = '';

  showCreatePersonaForm: boolean = false;
  showEditPersonaForm: boolean = false;

  personaId: string | null = null;
  personaDocumentId: string = '';

personaUserId: number | null = null;
personaEstudiantesIds: number[] = [];


  personaNombre: string = '';
  personaTelefono: string = '';
  personaEstado: string = 'Activo';
  estados = ['Activo', 'Inactivo'];

  personaCredencialFile: File | null = null;
  personaCredencialUrl: string = '';
  personaLoading = false;


  estudiantes: any[] = [];
  estudianteErrorMessage: string = '';

  showCreateEstudianteForm: boolean = false;
  showEditEstudianteForm: boolean = false;

  estudianteId: number | null = null;
  estudianteDocumentId: string = '';

  estudianteNombre: string = '';
  estudianteGrado: string = '';
  estudianteGrupo: string = '';

  docentes: any[] = [];
avisos: any[] = [];

estudianteDocenteId: number | null = null;
estudiantePersonasAutorizadasIds: number[] = [];
estudianteAvisosIds: number[] = [];



docenteErrorMessage: string = '';

showCreateDocenteForm: boolean = false;
showEditDocenteForm: boolean = false;

docenteId: number | null = null;
docenteDocumentId: string = '';

docenteNombre: string = '';


docenteUserId: number | null = null;
docenteEstudiantesIds: number[] = [];
docenteFotoUrl: string = '';
docenteFotoFile: File | null = null;


  constructor(
    private authService: AuthService, private router: Router
  ) {}
async ngOnInit() {
  this.token = this.authService.getToken();
  await this.loadUsers();
  await this.loadRoles();
  await this.loadPersonas();      
  await this.loadDocentes();
  await this.loadAvisos();
  await this.loadEstudiantes();
}


 

async loadAvisos() {
  try {
    const res = await axios.get('http://localhost:1337/api/avisos', {
      params: { 'pagination[pageSize]': 100 },
      headers: { Authorization: `Bearer ${this.token}` }
    });

    this.avisos = Array.isArray(res.data.data)
      ? res.data.data.map((item: any) => ({
          id: item.id,
          titulo: item.titulo || item.attributes?.titulo || 'Sin título'
        }))
      : [];
  } catch (error) {
    console.error('Error cargando avisos:', error);
  }
}


  async loadRoles() {
    try {
      const response = await axios.get('http://localhost:1337/api/users-permissions/roles', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });

      this.roles = Object.values(response.data.roles);
    } catch (error) {
      console.error('Error al cargar roles', error);
    }
  }

  async loadUsers() {
    this.errorMessage = '';
    try {
      const response = await axios.get('http://localhost:1337/api/users?populate=role', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });

      if (!Array.isArray(response.data)) {
        this.errorMessage = 'La respuesta no es un arreglo de usuarios.';
        this.users = [];
        return;
      }

      this.users = response.data.map((u: any) => ({
        id: u.id,
        username: u.username || 'Sin username',
        email: u.email || 'Sin email',
        role: {
          id: u.role?.id || null,
          name: u.role?.name || 'Sin rol'
        }
      }));
    } catch (error: any) {
      console.error('Error cargando usuarios:', error);
      this.errorMessage = error.response?.data?.message || error.message || 'Error desconocido al cargar usuarios.';
    }
  }

  async deleteUser(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;
    try {
      await axios.delete(`http://localhost:1337/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      alert('Usuario eliminado');
      await this.loadUsers();
    } catch (error) {
      alert('Error al eliminar usuario');
    }
  }

  startEdit(user: any) {
    this.editingUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.role?.id || null,
      roleName: user.role?.name || 'Sin rol'
    };
  }

  cancelEdit() {
    this.editingUser = null;
  }

  async saveEdit() {
    if (!this.editingUser) return;

    try {
      const dataToUpdate: any = {
        username: this.editingUser.username,
        email: this.editingUser.email,
      };

      if (this.editingUser.roleId) {
        dataToUpdate.role = this.editingUser.roleId;
        const selectedRole = this.roles.find(r => r.id === this.editingUser.roleId);
        this.editingUser.roleName = selectedRole ? selectedRole.name : 'Sin rol';
      }

      await axios.put(`http://localhost:1337/api/users/${this.editingUser.id}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });

      alert('Usuario actualizado');
      this.editingUser = null;
      await this.loadUsers();

    } catch (error) {
      alert('Error al actualizar usuario');
    }
  }

  cancelCreate() {
    this.showCreateForm = false;
    this.newUser = {
      username: '',
      email: '',
      password: '',
      roleId: null
    };
  }

  async createUser() {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password || !this.newUser.roleId) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const registerResponse = await axios.post('http://localhost:1337/api/auth/local/register', {
        username: this.newUser.username,
        email: this.newUser.email,
        password: this.newUser.password
      });

      const createdUserId = registerResponse.data.user.id;

      await axios.put(`http://localhost:1337/api/users/${createdUserId}`, {
        role: this.newUser.roleId
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });

      alert('Usuario creado exitosamente');
      this.cancelCreate();
      await this.loadUsers();

    } catch (error: any) {
      console.error(error);
      alert('Error al crear usuario: ' + (error.response?.data?.error?.message || error.message));
    }
  }
 // puede ser 'usuarios', 'personas', 'docentes', 'estudiantes'

get filteredUsers() {
  if (this.selectedSegment !== 'usuarios') return [];
  // Aquí pones la condición real para filtrar usuarios, o true para no filtrar
  return this.users.filter(u => true);
}

get filteredPersonas() {
  if (this.selectedSegment !== 'personas') return [];
  return this.personas.filter(p => true);
}

get filteredDocentes() {
  if (this.selectedSegment !== 'docentes') return [];
  return this.docentes.filter(d => true);
}

get filteredEstudiantes() {
  if (this.selectedSegment !== 'estudiantes') return [];
  return this.estudiantes.filter(e => true);
}



async cerrarSesion() {
  console.log('Cerrar sesión');
  await this.authService.logout(); 
  this.router.navigate(['/login'], { replaceUrl: true }); 
}



  async loadPersonas() {
    this.personaErrorMessage = '';
    try {
      const res = await axios.get('http://localhost:1337/api/personas-autorizadas', {
           params: { 'pagination[pageSize]': 100, populate: '*' },
        headers: { Authorization: `Bearer ${this.token}` }
      });

      if (!Array.isArray(res.data.data)) {
        this.personaErrorMessage = 'La respuesta no es un arreglo';
        this.personas = [];
        return;
      }

      this.personas = res.data.data.map((item: any) => {
      const p = item.attributes || item; 
  return {
        id: item.id,
        documentId: item.documentId,
        nombre: item.nombre,
        telefono: item.telefono,
        estado: item.estado || 'Activo',
        credencialUrl: item.Credencial?.url || '',
        estudiantes: item.estudiantes || [],
        users_permissions_user: p.users_permissions_user,
        avisoTitulo: item.avisoTitulo || ''
  };
      });

    } catch (error) {
      console.error('Error cargando personas:', error);
      this.personaErrorMessage = 'Error cargando personas autorizadas';
    }
  }

  resetPersonaForm() {
    this.personaId = null;
    this.personaDocumentId = '';
    this.personaNombre = '';
    this.personaTelefono = '';
    this.personaEstado = 'Activo';
    this.personaCredencialFile = null;
    this.personaCredencialUrl = '';
  }

  onPersonaFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.personaCredencialFile = event.target.files[0];
      this.personaCredencialUrl = '';
    }
  }

  startCreatePersona() {
    this.resetPersonaForm();
    this.showCreatePersonaForm = true;
    this.showEditPersonaForm = false;
    this.personaUserId = null;
this.personaEstudiantesIds = [];

  }

  startEditPersona(persona: any) {
    this.personaId = persona.id;
    this.personaDocumentId = persona.documentId;

    this.personaNombre = persona.nombre;
    this.personaTelefono = persona.telefono;
    this.personaEstado = persona.estado;
    this.personaCredencialUrl = persona.credencialUrl || '';
    this.personaCredencialFile = null;

  this.personaUserId = persona.users_permissions_user?.id || null;
this.personaEstudiantesIds = persona.estudiantes?.map((e: any) => e.id) || [];


    this.showEditPersonaForm = true;
    this.showCreatePersonaForm = false;
  }

  cancelPersonaForm() {
    this.resetPersonaForm();
    this.showCreatePersonaForm = false;
    this.showEditPersonaForm = false;
  }

  async crearPersona() {
    if (!this.personaNombre || !this.personaEstado) {
      alert('Completa los campos obligatorios');
      return;
    }

    this.personaLoading = true;
    try {
      let credencialMediaId: number | null = null;

      if (this.personaCredencialFile) {
        const formData = new FormData();
        formData.append('files', this.personaCredencialFile);

        const uploadRes = await axios.post('http://localhost:1337/api/upload', formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        credencialMediaId = uploadRes.data[0].id;
      }

     const dataToSend: any = {
  nombre: this.personaNombre,
  telefono: this.personaTelefono,
  estado: this.personaEstado,
  users_permissions_user: this.personaUserId,
  estudiantes: this.personaEstudiantesIds,
  Credencial: credencialMediaId
};


      await axios.post('http://localhost:1337/api/personas-autorizadas', {
        data: dataToSend
      }, {
        headers: { Authorization: `Bearer ${this.token}` }
      });

      alert('Persona creada');
      this.cancelPersonaForm();
      await this.loadPersonas();

    } catch (error: any) {
      console.error('Error creando persona:', error);
      alert('Error al crear: ' + (error.response?.data?.message || error.message));
    } finally {
      this.personaLoading = false;
    }
  }





  async editarPersona() {
    if (!this.personaDocumentId) {
      console.error('Error: documentId es obligatorio para editar.');
      return;
    }

    const personaId = this.personaDocumentId;

   const dataToUpdate: any = {
  nombre: this.personaNombre,
  telefono: this.personaTelefono,
  estado: this.personaEstado,
  users_permissions_user: this.personaUserId,
  estudiantes: this.personaEstudiantesIds
};


    try {
      if (this.personaCredencialFile) {
        const formData = new FormData();
        formData.append('files', this.personaCredencialFile);

        const uploadRes = await axios.post('http://localhost:1337/api/upload', formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        dataToUpdate.Credencial = uploadRes.data[0].id;
      }

      await axios.put(
        `http://localhost:1337/api/personas-autorizadas/${personaId}`,
        { data: dataToUpdate },
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );

      alert('Persona actualizada correctamente');
      this.cancelPersonaForm();
      await this.loadPersonas();

    } catch (error: any) {
      console.error('Error actualizando persona:', error);
      alert('Error al actualizar persona: ' + (error.response?.data?.error?.message || error.message));
    }
  }

  async deletePersona(documentId: string) {
    if (!documentId) {
      alert('ID inválido para eliminar');
      return;
    }

    if (!confirm('¿Seguro que quieres eliminar esta persona?')) return;

    try {
      await axios.delete(`http://localhost:1337/api/personas-autorizadas/${documentId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      alert('Persona eliminada');
      await this.loadPersonas();
    } catch (error: any) {
      console.error('Error eliminando persona:', error);
      alert('Error al eliminar: ' + (error.response?.data?.message || error.message));
    }
  }




async loadEstudiantes() {
  this.estudianteErrorMessage = '';
  try {
     const res = await axios.get('http://localhost:1337/api/estudiantes', {
      params: { 'pagination[pageSize]': 100, populate: ['docente', 'personas_autorizadas', 'avisos'] },
      headers: { Authorization: `Bearer ${this.token}` }
    });

    console.log('Respuesta estudiantes:', res.data); 

    if (!Array.isArray(res.data.data)) {
      this.estudianteErrorMessage = 'La respuesta no es un arreglo';
      this.estudiantes = [];
      return;
    }

   
    this.estudiantes = res.data.data.map((item: any) => {
     
      if(item.attributes){
        return {
          id: item.id,
          documentId: item.attributes.documentId,
          nombre: item.attributes.nombre,
          grado: item.attributes.grado,
          grupo: item.attributes.grupo
        };
      }
   
      return {
        id: item.id,
        documentId: item.documentId,
        nombre: item.nombre,
        grado: item.grado,
        grupo: item.grupo
      };
    });

  } catch (error) {
    console.error('Error cargando estudiantes:', error);
    this.estudianteErrorMessage = 'Error cargando estudiantes';
  }
}


  resetEstudianteForm() {

      
    this.estudianteDocumentId = '';
    this.estudianteNombre = '';
    this.estudianteGrado = '';
    this.estudianteGrupo = '';
  }

  startCreateEstudiante() {
    this.resetEstudianteForm();
    this.showCreateEstudianteForm = true;
    this.showEditEstudianteForm = false;
  }

 

  cancelEstudianteForm() {
    this.resetEstudianteForm();
    this.showCreateEstudianteForm = false;
    this.showEditEstudianteForm = false;
  }

  async crearEstudiante() {
  if (!this.estudianteNombre || !this.estudianteGrado || !this.estudianteGrupo) {
    alert('Por favor, completa todos los campos');
    return;
  }

  try {
    const dataToSend = {
      nombre: this.estudianteNombre,
      grado: this.estudianteGrado,
      grupo: this.estudianteGrupo,
      documentId: this.estudianteDocumentId || undefined,
      docente: this.estudianteDocenteId,
      personas_autorizadas: this.estudiantePersonasAutorizadasIds,
      avisos: this.estudianteAvisosIds
    };

    await axios.post('http://localhost:1337/api/estudiantes', {
      data: dataToSend
    }, {
      headers: { Authorization: `Bearer ${this.token}` }
    });

    alert('Estudiante creado exitosamente');
    this.cancelEstudianteForm();
    await this.loadEstudiantes();

  } catch (error: any) {
    console.error('Error creando estudiante:', error);
    alert('Error al crear estudiante: ' + (error.response?.data?.message || error.message));
  }
}

  
startEditEstudiante(estudiante: any) {
  this.estudianteId = estudiante.id;
  this.estudianteDocumentId = estudiante.documentId;

  this.estudianteNombre = estudiante.nombre;
  this.estudianteGrado = estudiante.grado;
  this.estudianteGrupo = estudiante.grupo;


  this.estudianteDocenteId = estudiante.docente?.id || null;
  this.estudiantePersonasAutorizadasIds = estudiante.personas_autorizadas ? estudiante.personas_autorizadas.map((p: any) => p.id) : [];
  this.estudianteAvisosIds = estudiante.avisos ? estudiante.avisos.map((a: any) => a.id) : [];

  this.showEditEstudianteForm = true;
  this.showCreateEstudianteForm = false;
}



async editarEstudiante() {
  if (!this.estudianteDocumentId) {
    alert('Error: documentId es obligatorio para editar.');
    return;
  }

  const estudianteId = this.estudianteDocumentId;

  const dataToUpdate: any = {
    nombre: this.estudianteNombre,
    grado: this.estudianteGrado,
    grupo: this.estudianteGrupo,
    docente: this.estudianteDocenteId,
    personas_autorizadas: this.estudiantePersonasAutorizadasIds,
    avisos: this.estudianteAvisosIds
  };

  try {
    await axios.put(`http://localhost:1337/api/estudiantes/${estudianteId}`, {
      data: dataToUpdate
    }, {
      headers: { Authorization: `Bearer ${this.token}` }
    });

    alert('Estudiante actualizado exitosamente');
    this.cancelEstudianteForm();
    await this.loadEstudiantes();

  } catch (error: any) {
    console.error('Error actualizando estudiante:', error);
    alert('Error al actualizar estudiante: ' + (error.response?.data?.message || error.message));
  }
}


 async deleteEstudiante(documentId: string) {
    if (!documentId) {
      alert('ID inválido para eliminar estudiante');
      return;
    }

    if (!confirm('¿Seguro que quieres eliminar este estudiante?')) return;

    try {
     

      await axios.delete(`http://localhost:1337/api/estudiantes/${documentId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      alert('Estudiante eliminado');
      await this.loadEstudiantes();
    } catch (error: any) {
      console.error('Error eliminando estudiante:', error);
      alert('Error al eliminar estudiante: ' + (error.response?.data?.message || error.message));
    }
  }

  resetDocenteForm() {
  this.docenteId = null;
  this.docenteDocumentId = '';
  this.docenteNombre = '';
}


startCreateDocente() {
  this.resetDocenteForm();
  this.showCreateDocenteForm = true;
  this.showEditDocenteForm = false;
}


cancelDocenteForm() {
  this.resetDocenteForm();
  this.showCreateDocenteForm = false;
  this.showEditDocenteForm = false;
}


async loadDocentes() {
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

    this.docentes = res.data.data.map((item: any) => {
      const d = item.attributes || item; 
      return {
        id: item.id,
        documentId: d.documentId,
        nombre: d.nombre || 'Sin nombre',
        users_permissions_user: d.users_permissions_user,
        estudiantes: d.estudiantes,
        foto: d.foto
      };
    });

  } catch (error) {
    console.error('Error cargando docentes:', error);
    this.docenteErrorMessage = 'Error cargando docentes';
  }
}

onDocenteFileSelected(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.docenteFotoFile = event.target.files[0];
    if (this.docenteFotoFile) {
      this.docenteFotoUrl = URL.createObjectURL(this.docenteFotoFile);
    } else {
      this.docenteFotoUrl = '';
    }
  }
}






startEditDocente(docente: any) {
  this.docenteId = docente.id;
  this.docenteDocumentId = docente.documentId;
  this.docenteNombre = docente.nombre || '';


  this.docenteUserId = docente.users_permissions_user?.id || null;
  this.docenteEstudiantesIds = docente.estudiantes ? docente.estudiantes.map((e: any) => e.id) : [];
  this.docenteFotoUrl = docente.foto?.url ? 'http://localhost:1337' + docente.foto.url : '';

  this.docenteFotoFile = null;

  this.showEditDocenteForm = true;
  this.showCreateDocenteForm = false;
}


async crearDocente() {
  if (!this.docenteNombre) {
    alert('Por favor, ingresa el nombre del docente');
    return;
  }

  try {
    let fotoId = null;

    if (this.docenteFotoFile) {
      const formData = new FormData();
      formData.append('files', this.docenteFotoFile);

      const uploadRes = await axios.post('http://localhost:1337/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      fotoId = uploadRes.data[0].id;
    }

    const dataToSend: any = {
      nombre: this.docenteNombre,
      users_permissions_user: this.docenteUserId,
      estudiantes: this.docenteEstudiantesIds
    };

    if (fotoId) {
      dataToSend.foto = fotoId;
    }

    await axios.post('http://localhost:1337/api/docentes', {
      data: dataToSend
    }, {
      headers: { Authorization: `Bearer ${this.token}` }
    });

    alert('Docente creado exitosamente');
    this.cancelDocenteForm();
    await this.loadDocentes();

  } catch (error: any) {
    console.error('Error creando docente:', error);
    alert('Error al crear docente: ' + (error.response?.data?.message || error.message));
  }
}

async editarDocente() {
  if (!this.docenteDocumentId) {
    alert('Error: documentId es obligatorio para editar.');
    return;
  }

  try {
    let fotoId = null;

    if (this.docenteFotoFile) {
      const formData = new FormData();
      formData.append('files', this.docenteFotoFile);

      const uploadRes = await axios.post('http://localhost:1337/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      fotoId = uploadRes.data[0].id;
    }

    const dataToUpdate: any = {
      nombre: this.docenteNombre,
      users_permissions_user: this.docenteUserId,
      estudiantes: this.docenteEstudiantesIds
    };

    if (fotoId) {
      dataToUpdate.foto = fotoId;
    }

    await axios.put(`http://localhost:1337/api/docentes/${this.docenteDocumentId}`, {
      data: dataToUpdate
    }, {
      headers: { Authorization: `Bearer ${this.token}` }
    });

    alert('Docente actualizado exitosamente');
    this.cancelDocenteForm();
    await this.loadDocentes();

  } catch (error: any) {
    console.error('Error actualizando docente:', error);
    alert('Error al actualizar docente: ' + (error.response?.data?.message || error.message));
  }
}



async deleteDocente(documentId: string) {
  if (!documentId) {
    alert('ID inválido para eliminar docente');
    return;
  }

  if (!confirm('¿Seguro que quieres eliminar este docente?')) return;

  try {
    await axios.delete(`http://localhost:1337/api/docentes/${documentId}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    alert('Docente eliminado');
    await this.loadDocentes();
  } catch (error: any) {
    console.error('Error eliminando docente:', error);
    alert('Error al eliminar docente: ' + (error.response?.data?.message || error.message));
  }
}


}
  