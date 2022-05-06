import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MockStore, provideMockStore} from "@ngrx/store/testing";

describe('SnackbarComponent', () => {
  let store: MockStore<any>;
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule
      ],
      declarations: [ SnackbarComponent ],
      providers: [
        provideMockStore({
          initialState: {
            notifications: {
              snackbar: {
                text: 'Text',
                snackbarType: 'success',
              },
            }
          }
        }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  //
  // it('should unsubscribe when ngOnDestroy', () => {
  //   const method = spyOn(component.snackbarSub, 'unsubscribe');
  //   component.ngOnDestroy();
  //   expect(method).toHaveBeenCalled();
  // });
});
