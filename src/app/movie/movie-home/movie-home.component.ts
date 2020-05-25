import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css']
})
export class MovieHomeComponent implements OnInit {

  dato = localStorage.getItem('usuario');



  constructor() { }

  ngOnInit(): void {
    console.log(this.dato);
  }

}
