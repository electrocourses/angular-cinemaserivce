import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaHallDetailComponent } from './cinema-hall-detail.component';

describe('CinemaHallDetailComponent', () => {
  let component: CinemaHallDetailComponent;
  let fixture: ComponentFixture<CinemaHallDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaHallDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaHallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
