import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';  // Ajusta la ruta según dónde lo crees



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
   {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
      canActivate: [NoAuthGuard]
  },
  {
    path: 'home-padre',
    loadChildren: () => import('./pages/home-padre/home-padre.module').then(m => m.HomePadrePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-docente',
    loadChildren: () => import('./pages/home-docente/home-docente.module').then(m => m.HomeDocentePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-persona',
    loadChildren: () => import('./pages/crear-persona/crear-persona.module').then( m => m.CrearPersonaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-docente',
    loadChildren: () => import('./pages/crear-docente/crear-docente.module').then( m => m.CrearDocentePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-estudiante',
    loadChildren: () => import('./pages/crear-estudiante/crear-estudiante.module').then( m => m.CrearEstudiantePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ver-docentes',
    loadChildren: () => import('./pages/ver-docentes/ver-docentes.module').then( m => m.VerDocentesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ver-estudiantes',
    loadChildren: () => import('./pages/ver-estudiantes/ver-estudiantes.module').then( m => m.VerEstudiantesPageModule),
    canActivate: [AuthGuard]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
