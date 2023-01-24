import { async, TestBed } from '@angular/core/testing';
import { CinemaHallsEditComponent } from './cinema-halls-edit.component';
describe('CinemaHallsEditComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CinemaHallsEditComponent]
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
//# sourceMappingURL=cinema-halls-edit.component.spec.js.map