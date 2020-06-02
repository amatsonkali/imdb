import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieHomeComponent } from './movie/movie-home/movie-home.component';
import { LoginComponent} from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieCreateComponent } from './movie/movie-create/movie-create.component';
import { MovieCreatePersonaComponent } from './movie/movie-create-persona/movie-create-persona.component';
import {AuthGuard} from './User/guards/auth.guard'
import { PersonaBrowserComponent } from './persona/persona-browser/persona-browser.component';
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home',  component: MovieHomeComponent, canActivate: [AuthGuard]},
  {path: 'movie', component: MovieDetailsComponent, canActivate: [AuthGuard]},
  {path: 'crear', component: MovieCreateComponent, canActivate: [AuthGuard]},
  //{path: 'crearPersona', component: MovieCreatePersonaComponent},
  {path: 'persona',component: PersonaBrowserComponent}
  //, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
