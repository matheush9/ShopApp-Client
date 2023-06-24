import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Image } from '../interfaces/image-interface';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl?: string;
  private imagesProviderUrl: string;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.apiUrl = environment.apiUrl;
    this.imagesProviderUrl = environment.imagesProviderUrl;
  }

  getImagesProviderUrl() {
    return this.imagesProviderUrl;
  }

  getImage(id: number): Observable<Image> {
    return this.httpClient.get<Image>(this.apiUrl + '/Image/' + id);
  }

  getImageByUser(userId: number): Observable<Image> {
    return this.httpClient.get<Image>(this.apiUrl + '/Image/user/' + userId);
  }

  deleteImageById(id: number): Observable<Image[]> {
    return this.httpClient.delete<Image[]>(this.apiUrl + '/Image/' + id, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  uploadImageFile(imageFile: FormData) {
    return this.httpClient.post(this.apiUrl + '/Image', imageFile);
  }
}
