import {TestBed} from "@angular/core/testing";
import {CustomValidators} from "./custom-validators";

describe('CustomValidators', () => {
  let customValidators: CustomValidators;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomValidators,
      ]
    });

    customValidators = TestBed.inject(CustomValidators);
  });

  it('create an instance', () => {
    expect(customValidators).toBeTruthy();
  });

  it('set working passwordMatchValidator', () => {
    // @ts-ignore
    const control: any = {
      // @ts-ignore
      get(path: string) {
        if (path === 'password') {
          return {value: 'password'}
        }
        if (path === 'confirmPassword') {
          return {
            value: 'password1',
            setErrors: () => {}
          }
        }
      }
    }

    const method = spyOn(control.get('confirmPassword'), 'setErrors');
    CustomValidators.passwordMatchValidator(control)
    expect(method).toBeTruthy();
  });

  it('set working passwordNotMatchValidator', () => {
    // @ts-ignore
    const control: any = {
      // @ts-ignore
      get(path: string) {
        if (path === 'password') {
          return {
            value: 'password',
            setErrors: () => {}
          }
        }
        if (path === 'oldPassword') {
          return {value: 'password'}
        }
      }
    }

    const method = spyOn(control.get('password'), 'setErrors');
    CustomValidators.passwordNotMatchValidator(control)
    expect(method).toBeTruthy();
  });
});
