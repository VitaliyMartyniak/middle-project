import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDndComponent } from './photo-dnd.component';

describe('PhotoDndComponent', () => {
  let component: PhotoDndComponent;
  let fixture: ComponentFixture<PhotoDndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoDndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
