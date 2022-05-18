import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../shared/custom-validators/custom-validators";
import {ProfileService} from "../../profile.service";
import {getAuth} from "@angular/fire/auth";
import {setProfileLoading} from "../../../../store/actions/profile";
import {Store} from "@ngrx/store";
import {catchError, finalize, mergeMap, of} from "rxjs";
import {setSnackbar} from "../../../../store/actions/notifications";
import { EmailAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {
  @ViewChild('oldPassword') oldPassword: ElementRef;

  private auth = getAuth();
  form: FormGroup;

  constructor(private profileService: ProfileService, private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
      // @ts-ignore
    }, [CustomValidators.passwordMatchValidator, CustomValidators.passwordNotMatchValidator]);
  }

  updatePassword(): void {
    const formData = {...this.form.value};
    const user = this.auth.currentUser!;
    if (!user || !user.email) return
    const credential = EmailAuthProvider.credential(
      user.email,
      formData.oldPassword
    );
    this.store.dispatch(setProfileLoading({isLoading: true}));
    this.profileService.checkOldPassword(user, credential).pipe(
      mergeMap(() => {
        return this.profileService.updatePassword(user, formData.password)
      }),
      finalize(() => {
        this.form.reset();
        this.store.dispatch(setProfileLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe(() => {
      this.store.dispatch(setSnackbar({text: 'Password successfully updated!', snackbarType: 'success'}));
    });
  }
}
