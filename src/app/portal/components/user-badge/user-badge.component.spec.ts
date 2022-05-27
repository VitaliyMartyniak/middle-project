import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBadgeComponent } from './user-badge.component';
import {LoaderComponent} from "../../../shared/components/loader/loader.component";

describe('UserBadgeComponent', () => {
  let component: UserBadgeComponent;
  let fixture: ComponentFixture<UserBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserBadgeComponent,
        LoaderComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
