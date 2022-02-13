import { AbstractControl } from '@angular/forms';
import {ProfileService} from "../portal/profile/profile.service";
import firebase from "firebase/compat/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import {catchError, debounceTime, delay, distinctUntilChanged, map, mergeMap, of, switchMap} from "rxjs";

export class CustomValidators {
  static passwordMatchValidator(control: AbstractControl): void {
    const password: string = control.get('password')!.value;
    const confirmPassword: string = control.get('confirmPassword')!.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')!.setErrors({ noPassswordMatch: true });
    }
  }

  static passwordNotMatchValidator(control: AbstractControl): void {
    const oldPassword: string = control.get('oldPassword')!.value;
    const newPassword: string = control.get('password')!.value;
    if (oldPassword === newPassword && newPassword !== '') {
      control.get('password')!.setErrors({ passswordMatch: true });
    }
  }

  static oldPasswordValidator(profileService: ProfileService, auth: any) {
    return (control: AbstractControl) => {
      const oldPassword: string = control.get('oldPassword')!.value;
      console.log('works', oldPassword);
      // of(oldPassword).pipe(
      //   debounceTime(2500),
      //   distinctUntilChanged()
      // )
      // mergeMap(value => {
      //   console.log('mergeMap', value);
      //   const user = auth.currentUser;
      //   const oldPassword: string = control.get('oldPassword')!.value;
      //   const credential = EmailAuthProvider.credential(
      //     user.email,
      //     oldPassword
      //   );
      //   return profileService.checkOldPassword(user, credential).pipe(
      //   map(isAvail => console.log('isAvail', isAvail)),
      //   // map(isAvail => isAvail ? null : { unavailable: true }),
      //   catchError(err => err))
      // })
      //   .subscribe(value => {
      //     console.log('control', value);
      //   },
      //   error => {
      //     console.log('error', error);
      //   })


      // return of(control).pipe(
      //   debounceTime(2500),
      //   distinctUntilChanged(),
      //   switchMap(value => {
      //     console.log('switchMap', value);
      //     const user = auth.currentUser;
      //     const oldPassword: string = control.get('oldPassword')!.value;
      //     const credential = EmailAuthProvider.credential(
      //       user.email,
      //       oldPassword
      //     );
      //     return profileService.checkOldPassword(user, credential).pipe(
      //       map(isAvail => console.log('isAvail', isAvail)),
      //       // map(isAvail => isAvail ? null : { unavailable: true }),
      //       catchError(err => err))
      //   }))

      // const oldPassword: string = control.get('oldPassword')!.value;
      // if (!oldPassword) {
      //   return
      // }
      // console.log('works', oldPassword);
      // const user = auth.currentUser;
      // console.log(user, 'user');
      // const credential = EmailAuthProvider.credential(
      //   user.email,
      //   oldPassword
      // );
      // return profileService.checkOldPassword(user, credential).pipe(
      //   debounceTime(2500),
      //   map(
      //   (value) => {
      //     console.log('value', value);
      //     control.get('password')!.setErrors({ oldPasswordValid: true });
      //     // return (users && users.length > 0) ? { "mobNumExists": true } : null;
      //   }
      // ));


      if (!oldPassword) {
        return
      }
      console.log('works', oldPassword);
      const user = auth.currentUser;
      console.log(user, 'user');
      const credential = EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      profileService.checkOldPassword(user, credential).subscribe(result => {
        control.get('oldPassword')!.setErrors({ oldPasswordValid: false });
        console.log('result', result);
      },(e => {
        console.log('errors');
        control.get('oldPassword')!.setErrors({ oldPasswordValid: true });
        return e
      }));
    }
  }
}
