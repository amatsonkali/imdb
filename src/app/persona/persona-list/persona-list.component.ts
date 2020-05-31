import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {

  @Input() personas: Persona[];
  @Output() selectedPersona= new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  selectPersona(index:number){
    this.selectedPersona.emit(this.personas[index]);
  }

}
