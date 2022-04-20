import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinValueComponent } from './bitcoin-value.component';

describe('BitcoinValueComponent', () => {
  let component: BitcoinValueComponent;
  let fixture: ComponentFixture<BitcoinValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinValueComponent ]
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
