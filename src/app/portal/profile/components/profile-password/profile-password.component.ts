import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../shared/custom-validators";

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {
  form: FormGroup;

  constructor() {}

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
    // console.log(this.form);
  }

  submit() {
    const formData = {...this.form.value}
    // console.log(formData);
  }
}
