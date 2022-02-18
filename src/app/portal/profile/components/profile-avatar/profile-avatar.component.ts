import {Component, Input} from '@angular/core';
import {FileHandle} from "../../../../shared/directives/photo-dnd.directive";
import {AuthService} from "../../../../authentication/services/auth.service";

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent {
  @Input() docID = '';

  base64File = '';

  constructor(private authService: AuthService) { }

  updateFile(base64File: string) {
    this.base64File = base64File;
  }

  updateAvatar() {
    this.authService.updateUserProfileInfo({photoUrl: this.base64File}, this.docID).subscribe((data) => {
      console.log('profile info data', data);// returns undefined
    });
  }
}
