import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Image } from '../interfaces/image-interface';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {}

  getImagesProviderUrl() {
    return environment.imagesProviderUrl;
  }

  getImage(id: number): Observable<Image> {
    return this.httpClient.get<Image>(environment.apiUrl + '/Image/' + id).pipe(
      map((image: Image) => {
        image.largeImagePath = environment.imagesProviderUrl + image.largeImagePath;
        image.smallImagePath = environment.imagesProviderUrl + image.smallImagePath;
        return image;
      })
    );
  }

  getImageByUser(userId: number): Observable<Image> {
    return this.httpClient.get<Image>(
      environment.apiUrl + '/Image/user/' + userId
    ).pipe(
      map((image: Image) => {
        image.largeImagePath = environment.imagesProviderUrl + image.largeImagePath;
        image.smallImagePath = environment.imagesProviderUrl + image.smallImagePath;
        return image;
      })
    );
  }

  deleteImageById(id: number): Observable<Image[]> {
    return this.httpClient.delete<Image[]>(
      environment.apiUrl + '/Image/' + id,
      {
        headers: this.jwtTokenService.getAuthHeader(),
      }
    );
  }

  addImage(imageFile: FormData) {
    return this.httpClient.post(environment.apiUrl + '/Image', imageFile);
  }

  uploadImage(
    image: File,
    userId?: number,
    productId?: number
  ): Observable<Object> {
    if (!image) return throwError(() => new Error('The file is not valid!'));

    const imageName = (userId ? '-user.' : '-product.') + image.name;

    const formData = new FormData();
    const imageModel = {
      name: imageName,
      userId: userId,
      productId: productId,
    } as Image;

    formData.append('imageFile', image, imageName);
    formData.append('json', JSON.stringify(imageModel));

    return this.addImage(formData);
  }
}
