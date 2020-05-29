import { Component, OnInit, Input } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-movie-add-persona',
  templateUrl: './movie-add-persona.component.html',
  styleUrls: ['./movie-add-persona.component.css']
})
export class MovieAddPersonaComponent implements OnInit {
  @Input() personaList: Persona[];
  @Input() selectedPersonas: Persona[];
  @Input() titulo: string;
  @Input() actorMode: boolean=false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor() { }

  ngOnInit(): void {
  }

  selectPersona(index){
    console.log("Persona agredada: "+index);
    let buscado= this.selectedPersonas.findIndex(p=> p.idPersona==this.personaList[index].idPersona);
    //console.log("Esta seleccionado?: "+buscado);
    if(buscado ==-1){
      this.selectedPersonas.push(this.personaList[index]);
      console.log(this.selectedPersonas);
    }
  }

  borrarPersona(e,index){
    e.preventDefault();
    console.log("Borrando index..."+index);
    this.selectedPersonas.splice(index,1);
    console.log(this.selectedPersonas);
  }

  addPersonaje(event: MatChipInputEvent, iPersona: number): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      //if(!this.selectedPersonas[iPersona].personajes) this.selectedPersonas[iPersona].personajes=[];
      //this.fruits.push({name: value.trim()});
      //this.selectedPersonas[iPersona].personajes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  borrarPersonaje(iPersona,iPersonaje){
    //this.selectedPersonas[iPersona].personajes.splice(iPersonaje,1);
  }

  trackByFn(index: any, item: any) {
    return index;
 }
}
