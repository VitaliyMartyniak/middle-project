import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../shared/custom-validators";
import {ProfileService} from "../../profile.service";
import {getAuth} from "@angular/fire/auth";
import {debounceTime, distinctUntilChanged, fromEvent} from "rxjs";
import { ChangeDetectorRef } from '@angular/core';
import firebase from "firebase/compat/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import User = firebase.User;

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {
  @ViewChild('oldPassword') oldPassword: ElementRef;

  private auth = getAuth();
  form: FormGroup;

  constructor(private profileService: ProfileService) {}

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

  // ngAfterViewInit() {
  //   // this.fieldOne.valueChanges
  //   //   .pipe(debounceTime(300))
  //   //   .subscribe(value => {
  //   //     this.formGroup.get('fieldOne').setValue(value);
  //   //   });
  //   let oldPassword$ = fromEvent(this.oldPassword.nativeElement, 'keyup').pipe(
  //     debounceTime(3000),
  //     distinctUntilChanged()
  //   )
  //   .subscribe((elem: any) => {
  //     const oldPassword = elem.target.value;
  //     this.form.patchValue({oldPassword});
  //     this.form.get('oldPassword')!.markAsDirty();
  //     this.form.get('oldPassword')!.markAsTouched();
  //     oldPassword === '' ? this.form.get('oldPassword')!.setErrors({ required: true }) : this.form.get('oldPassword')!.setErrors({ required: false })
  //   });
  // }

  // get oldPasswordRequiredErrors() {
  //   // @ts-ignore
  //   console.log('this.form.get(\'oldPassword\')!.errors[\'required\']', this.form.get('oldPassword')!.errors['required']);
  //   // @ts-ignore
  //   return this.form.get('oldPassword')!.errors['required'];
  // }

  updatePassword(): void {
    const formData = {...this.form.value};
    const user: any = this.auth.currentUser!;
    if (!user || !user.email) return
    const credential = EmailAuthProvider.credential(
      user.email,
      formData.oldPassword
    );
    this.profileService.checkOldPassword(user, credential).subscribe(() => {
      console.log('old password is correct');
      this.profileService.updatePassword(user, formData.password).subscribe(() => {
        console.log('new password is set');
      })
    },(e => {
      console.log('old password is not correct');
      return e
    }));
  }
}
