import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Image } from '../interfaces/image-interface';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl?: string;
  private imagesProviderUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.imagesProviderUrl = environment.imagesProviderUrl;
  }

  getImagesProviderUrl() {
    return this.imagesProviderUrl;
  }

  getImage(id: number): Observable<Image> {
    return this.httpClient.get<Image>(this.apiUrl + '/Image/' + id);    
  }

  getImagesbyProduct(id: number): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.apiUrl + '/Image/product/' + id);        
  }
}
