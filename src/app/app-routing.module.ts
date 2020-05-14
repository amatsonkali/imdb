import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieHomeComponent } from './movie-home/movie-home.component';


const routes: Routes = [
  {path: 'home', component: MovieHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
