import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/users/users.service';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Users } from 'src/app/users/users';
import { UploadProfilePictureComponent } from './upload-profile-picture/upload-profile-picture.component';
import { PlaceLocation } from 'src/app/services/location';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { Classifications } from './../../shared/class/classifications';
import { ClassificationsService } from './../../shared/services/classifications.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {
  user: firebase.User;
  users: Users;
  location: PlaceLocation;
  isLoading: boolean;
  classifications: Classifications[];
  selectedClassification: string;
  selectedExperience: string;
  private authSub: Subscription;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private modalCtrl: ModalController,
    private classificationsService: ClassificationsService,
    private popper: PopoverController
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.authSub = this.authService.getUserState().pipe(
      switchMap(user => {
        if (user) {
          this.user = user;
          return this.userService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe((users) => {
        this.isLoading = false;
        this.users = users;
        this.getUser(this.user.uid);
    });

    this.classificationsService.getClassifications().subscribe((classifications) => {
      this.classifications = classifications;
    });
  }

  getUser(userId: string) {
    this.userSub = this.userService.getUser(userId)
      .subscribe((detail) => {
        this.selectedExperience = (detail.skills) ? detail.skills.level : '';
        this.selectedClassification = (detail.skills) ? detail.skills.name : '';
        this.location = detail.location;
      }
    );
  }

  presentPopover(e: CustomEvent) {
    this.popper.create({
      component: PopoverComponent,
      event: e
    }).then((popoverEl) => {
      popoverEl.present();
    });
  }

  onLocationPicked(selectedLocation: PlaceLocation, userId: string) {
    const data = {
      id: userId,
      location: selectedLocation
    };
    this.userService.update(data)
      .then(() => {
        this.getUser(userId);
      }
    );
  }

  onImagePicked(event) {
    this.modalCtrl
      .create({
        component: UploadProfilePictureComponent
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'success') {
          this.getPhotoUrl(this.user.uid);
        }
      });
  }

  getPhotoUrl(userId: string) {
    this.userSub = this.userService.getUser(this.user.uid)
      .subscribe((profile) => {
        this.users.photoURL = profile.photoURL;
      }
    );
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}