import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinValueComponent } from './bitcoin-value.component';
import {provideMockStore} from "@ngrx/store/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('BitcoinValueComponent', () => {
  let component: BitcoinValueComponent;
  let fixture: ComponentFixture<BitcoinValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinValueComponent ],
      providers: [
        provideMockStore()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
