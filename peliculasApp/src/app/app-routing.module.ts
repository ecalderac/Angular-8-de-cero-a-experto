import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'pelicula/:id', component: PeliculaComponent
  },
  {
    path: 'buscar/:texto', component: BuscarComponent
  },
  {
    path: '**', redirectTo: '/home'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
