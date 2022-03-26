import {Component, Input} from '@angular/core';
import {AuthService} from "../../../../authentication/services/auth.service";
import {Store} from "@ngrx/store";
import {setProfileLoading} from "../../../../store/actions/profile";

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent {
  @Input() docID: string | undefined;

  base64File = '';

  constructor(private authService: AuthService, private store: Store) { }

  updateFile(base64File: string): void {
    this.base64File = base64File;
  }

  updateAvatar(): void {
    this.store.dispatch(setProfileLoading({isLoading: true}));
    this.authService.updateUserProfileInfo({photoUrl: this.base64File}, this.docID!).subscribe(() => {
      // returns undefined
      this.store.dispatch(setProfileLoading({isLoading: false}));
    });
  }
}
