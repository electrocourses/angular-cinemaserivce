import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaHallsEditComponent } from './cinema-halls-edit.component';

describe('CinemaHallsEditComponent', () => {
  let component: CinemaHallsEditComponent;
  let fixture: ComponentFixture<CinemaHallsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaHallsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaHallsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
