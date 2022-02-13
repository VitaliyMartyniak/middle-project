import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../shared/custom-validators";
import {ProfileService} from "../../profile.service";
import {getAuth} from "@angular/fire/auth";
import {debounceTime, distinctUntilChanged, fromEvent} from "rxjs";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit, AfterViewInit {
  @ViewChild('oldPassword') oldPassword: ElementRef;

  private auth = getAuth();
  form: FormGroup;

  constructor(private profileService: ProfileService, private ref: ChangeDetectorRef) {}

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
    }, [CustomValidators.passwordMatchValidator, CustomValidators.passwordNotMatchValidator, CustomValidators.oldPasswordValidator(this.profileService, this.auth)]);
    // console.log(this.form);
  }

  ngAfterViewInit() {
    // this.fieldOne.valueChanges
    //   .pipe(debounceTime(300))
    //   .subscribe(value => {
    //     this.formGroup.get('fieldOne').setValue(value);
    //   });
    let oldPassword$ = fromEvent(this.oldPassword.nativeElement, 'keyup').pipe(
      debounceTime(3000),
      distinctUntilChanged()
    )
    .subscribe((elem: any) => {
      const oldPassword = elem.target.value;
      this.form.patchValue({oldPassword});
      this.form.get('oldPassword')!.markAsDirty();
      this.form.get('oldPassword')!.markAsTouched();
      // this.form.get('oldPassword')!.setErrors({ required: true });
      oldPassword === '' ? this.form.get('oldPassword')!.setErrors({ required: true }) : this.form.get('oldPassword')!.setErrors({ required: false })
      // console.log('control', this.form.get('oldPassword'));
      // this.ref.detectChanges();
    });
  }

  // get oldPasswordRequiredErrors() {
  //   // @ts-ignore
  //   console.log('this.form.get(\'oldPassword\')!.errors[\'required\']', this.form.get('oldPassword')!.errors['required']);
  //   // @ts-ignore
  //   return this.form.get('oldPassword')!.errors['required'];
  // }

  submit() {
    const formData = {...this.form.value}
    // console.log(formData);
  }
}
