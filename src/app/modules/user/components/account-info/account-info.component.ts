import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, tap } from 'rxjs';

import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User } from '../../interfaces/user-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';

import { UserService } from '../../services/user.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent {
  user$?: Observable<User>;
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    images: [],
  };
  imagesProviderUrl: string;
  imageFileName: string = '';
  isImageUploading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private imageService: ImageService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit() {
    this.getUser(); 
  }

  deleteAccountDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    dialogMessage: string
  ): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        message: dialogMessage,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteImage().subscribe(() => {
          this.deleteUser();
        })
      }
    });
  }

  getUser() {
    this.user$ = this.userService.setCurrentUser(true).pipe(tap((user) => {
      this.user = user;
    }));
  }

  deleteUser() {
    this.user$ = this.userService.deleteUser(this.user.id).pipe(
      tap(() => {
        this.userService.removeCurrentUser();    
        this.getUser();
      })
    );
  }

  deleteImage(): Observable<Image[]> {
    if (this.user.images[0])
      return this.imageService.deleteImageById(this.user.images[0].id);
    return EMPTY;
  }

  editUserInfo() {
    this.user$ = this.userService.editUser(this.user.id, this.user).pipe(
      tap(() => {
        this.getUser();
      })
    );
  }

  changeImage(event: any) {
    this.isImageUploading = true;
    const imageFile: File = event.target.files[0];

    this.imageService.uploadImage(imageFile, this.user.id)?.subscribe(() => {
      this.deleteImage().subscribe({
        complete: () => {
          this.getUser();
          this.isImageUploading = false;
        },
      });
    });
  }
}
