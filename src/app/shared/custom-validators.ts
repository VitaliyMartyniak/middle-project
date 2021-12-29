import { AbstractControl } from '@angular/forms';

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
    console.log('oldPassword', oldPassword);
    console.log('newPassword', newPassword);
    console.log('oldPassword === newPassword', oldPassword === newPassword);
    if (oldPassword === newPassword) {
      console.log('works');
      control.get('password')!.setErrors({ passswordMatch: true });
    }
  }
}
