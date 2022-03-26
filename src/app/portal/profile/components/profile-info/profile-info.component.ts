import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {userSelector} from "../../../../store/selectors/auth";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthService} from "../../../../authentication/services/auth.service";
import {UserData} from "../../../../shared/interfaces";
import {setProfileLoading} from "../../../../store/actions/profile";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  form: FormGroup;
  private userSub: Subscription;
  docID: string | undefined = '';

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl(''),
      age: new FormControl('', [
        Validators.min(1),
      ]),
    });
    this.userSub = this.store.select(userSelector).subscribe((user: UserData): void => {
      this.form.patchValue({name: user.name});
      this.form.patchValue({lastName: user.lastName});
      this.form.patchValue({age: user.age});
      this.docID = user.docID;
    })
  }

  updateProfileInfo(): void {
    const formData = {...this.form.value};
    this.store.dispatch(setProfileLoading({isLoading: true}));
    this.authService.updateUserProfileInfo(formData, this.docID!).subscribe(() => {
      // returns undefined
      this.store.dispatch(setProfileLoading({isLoading: false}));
    });
  }
}
