import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { MovieService } from 'src/app/movie/movie-service/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persona-browser',
  templateUrl: './persona-browser.component.html',
  styleUrls: ['./persona-browser.component.css']
})
export class PersonaBrowserComponent implements OnInit {
  personas: Persona[];
  personasSub: Subscription;
  selectedPersona: Persona[];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllPersonas();
    this.personasSub = this.movieService.getPersonasListener().subscribe(
      (personas: Persona[])=>{
        this.personas= personas;
      }
    );
  }

}
