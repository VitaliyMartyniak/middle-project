import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAlternativeComponent } from './auth-alternative.component';

describe('AuthAlternativeComponent', () => {
  let component: AuthAlternativeComponent;
  let fixture: ComponentFixture<AuthAlternativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthAlternativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
