import { Component, OnInit, Input } from '@angular/core';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-persona-details',
  templateUrl: './persona-details.component.html',
  styleUrls: ['./persona-details.component.css']
})
export class PersonaDetailsComponent implements OnInit {
  @Input() persona: Persona;
  constructor() { }

  ngOnInit(): void {
  }

}
