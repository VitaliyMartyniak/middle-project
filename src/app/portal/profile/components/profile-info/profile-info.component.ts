import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {userSelector} from "../../../../store/selectors/auth";
import {catchError, finalize, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthService} from "../../../../authentication/services/auth.service";
import {UserData} from "../../../../shared/interfaces";
import {setProfileLoading} from "../../../../store/actions/profile";
import {setSnackbar} from "../../../../store/actions/notifications";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @Input() user: UserData;

  form: FormGroup;

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

    this.form.patchValue({name: this.user.name});
    this.form.patchValue({lastName: this.user.lastName});
    this.form.patchValue({age: this.user.age});
  }

  updateProfileInfo(): void {
    const formData = {...this.form.value};
    this.store.dispatch(setProfileLoading({isLoading: true}));
    this.authService.updateUserProfileInfo(formData, this.user.docID!).pipe(
      finalize(() => {
        this.store.dispatch(setProfileLoading({isLoading: false}));
      }),
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }),
    ).subscribe(() => {
      this.store.dispatch(setSnackbar({text: "Profile info successfully updated!", snackbarType: 'success'}));
    });
  }
}
