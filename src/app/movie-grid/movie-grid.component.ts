import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '../imageService/image.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
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

  isImageLoading=false;
  imageToShow: any;
  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
    this.getImageFromService();
  }

  getImageFromService() {
    this.isImageLoading = true;
    this.imageService.getImage("https://loremflickr.com/320/240").subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
}


createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

  @ViewChild('pic', { static: false }) pic: ElementRef;
   onLoad() {
   console.log((this.pic.nativeElement as HTMLImageElement).naturalWidth);
   console.log((this.pic.nativeElement as HTMLImageElement).naturalHeight);
 }

}
