import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaHallsComponent } from './cinema-halls.component';

describe('CinemaHallsComponent', () => {
  let component: CinemaHallsComponent;
  let fixture: ComponentFixture<CinemaHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
