import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '../imageService/image.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  img?: any;
}
@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Peli1', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Peli2', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Peli3', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Peli4', cols: 2, rows: 2, color: '#DDBDF1'},
    {text: 'Peli5', cols: 1, rows: 1, color: '#DDBDF1'}
  ];

  loading=true;
  imageToShow: any;
  numColumnas: number = 3;
  tilesPerColums: any[]=[];
  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
    this.getImageFromService();
  }

  getImageFromService() {
    this.tiles.forEach( (item,index)=>{
      this.imageService.getImage("https://loremflickr.com/"+this.getRandomInt(240,400)+"/"+this.getRandomInt(240,400)).subscribe(data => {
        this.createImageFromBlob(data,index);
      }, error => {
        this.loading = false;
        console.log(error);
      });
      
    })

    this.convertirArregloDado();
}

convertirArregloDado(){ //lo divide en el numero de tiles
  let modCounter;
  this.tiles.forEach((tile,index)=>{
    if(!this.tilesPerColums[index%3])
      this.tilesPerColums[index%3]=[];

    this.tilesPerColums[index%3].push(tile); 
  });
  console.log(this.tilesPerColums);
  this.loading=false;
}

createImageFromBlob(image: Blob, index: number) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      //this.imageToShow = reader.result;
      this.tiles[index].img= reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

// //   @ViewChild('pic', { static: false }) pic: ElementRef;
// //    onLoad() {
// //    console.log( (this.pic.nativeElement as HTMLImageElement).getAttribute("id")  );
// //    console.log((this.pic.nativeElement as HTMLImageElement).naturalWidth);
// //    console.log((this.pic.nativeElement as HTMLImageElement).naturalHeight);
// //  }

 getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

}
