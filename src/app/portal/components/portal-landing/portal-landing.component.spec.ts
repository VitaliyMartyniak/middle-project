import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalLandingComponent } from './portal-landing.component';

describe('PortalLandingComponent', () => {
  let component: PortalLandingComponent;
  let fixture: ComponentFixture<PortalLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
