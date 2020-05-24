import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieHomeComponent } from './movie/movie-home/movie-home.component';
import { LoginComponent} from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { SecondviewComponent } from './SecondView/secondview/secondview.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieCreateComponent } from './movie/movie-create/movie-create.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: MovieHomeComponent},
  {path: 'secondView', component: SecondviewComponent},
  {path: 'movie',component: MovieDetailsComponent},
  {path: 'movie',component: MovieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
