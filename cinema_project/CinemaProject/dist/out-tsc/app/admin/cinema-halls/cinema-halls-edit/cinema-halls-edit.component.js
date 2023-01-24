import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Layout, LayoutCapacity } from '../../../model/CinemaHall';
import { Validators } from '@angular/forms';
let CinemaHallsEditComponent = class CinemaHallsEditComponent {
    constructor(router, formBuilder, dataService, formResetService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.formResetService = formResetService;
        this.dataChangedEvent = new EventEmitter();
        this.message = '';
        this.layouts = Object.keys(Layout);
        this.layoutEnum = Layout;
    }
    ngOnInit() {
        this.initializeForm();
        this.resetEventSubscription = this.formResetService.cinemaHallEventEmitter.subscribe(next => {
            this.cinemaHall = next;
            this.initializeForm();
        });
    }
    ngOnDestroy() {
        this.resetEventSubscription.unsubscribe();
    }
    initializeForm() {
        console.log('On init method');
        this.cinemaHallForm = this.formBuilder.group({
            name: [this.cinemaHall.name, Validators.required],
            location: [this.cinemaHall.location, [Validators.required, Validators.minLength(2)]]
        });
        for (const layout of this.layouts) {
            const layoutCapacity = this.cinemaHall.capacities.find(lc => lc.layout === Layout[layout]);
            const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
            this.cinemaHallForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
        }
    }
    onSubmit() {
        this.cinemaHall.name = this.cinemaHallForm.controls['name'].value;
        this.cinemaHall.location = this.cinemaHallForm.value['location'];
        this.cinemaHall.capacities = new Array();
        for (const layout of this.layouts) {
            const layoutCapacity = new LayoutCapacity();
            layoutCapacity.layout = Layout[layout];
            layoutCapacity.capacity = this.cinemaHallForm.controls[`layout${layout}`].value;
            this.cinemaHall.capacities.push(layoutCapacity);
        }
        if (this.cinemaHall.id == null) {
            this.dataService.addCinemaHall(this.cinemaHall).subscribe(next => {
                this.dataChangedEvent.emit();
                this.router.navigate(['admin', 'cinemaHalls'], { queryParams: { action: 'view', id: next.id } });
            }, error => {
                this.message = 'Something went wrong, you may wish to try again.';
            });
        }
        else {
            this.dataService.updateCinemaHall(this.cinemaHall).subscribe(next => {
                this.dataChangedEvent.emit();
                this.router.navigate(['admin', 'cinemaHalls'], { queryParams: { action: 'view', id: next.id } });
            }, error => {
                this.message = 'Something went wrong, you may wish to try again.';
            });
        }
    }
};
tslib_1.__decorate([
    Input()
], CinemaHallsEditComponent.prototype, "cinemaHall", void 0);
tslib_1.__decorate([
    Output()
], CinemaHallsEditComponent.prototype, "dataChangedEvent", void 0);
CinemaHallsEditComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cinema-halls-edit',
        templateUrl: './cinema-halls-edit.component.html',
        styleUrls: ['./cinema-halls-edit.component.css']
    })
], CinemaHallsEditComponent);
export { CinemaHallsEditComponent };
//# sourceMappingURL=cinema-halls-edit.component.js.map