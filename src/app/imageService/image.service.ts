import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ImageService {

  
  constructor(private httpClient: HttpClient) { }

  getImage(imageUrl: string): Observable<Blob> {
    console.log("Compilando...");
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }


}
