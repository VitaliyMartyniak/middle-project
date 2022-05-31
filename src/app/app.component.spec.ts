import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NetworkService} from "./shared/services/network.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let networkService: NetworkService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: NetworkService,
          useValue: {
            monitor: () => {}
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    networkService = TestBed.inject(NetworkService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should start monitoring network service status', () => {
    const method = spyOn(networkService, 'monitor');
    component.ngOnInit();
    expect(method).toHaveBeenCalled();
  });
});
