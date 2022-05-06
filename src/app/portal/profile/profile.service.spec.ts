import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ]
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
