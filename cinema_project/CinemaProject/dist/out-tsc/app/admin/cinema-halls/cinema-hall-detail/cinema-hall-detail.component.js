import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let CinemaHallDetailComponent = class CinemaHallDetailComponent {
    constructor(router, dataService, authService) {
        this.router = router;
        this.dataService = dataService;
        this.authService = authService;
        this.dataChangedEvent = new EventEmitter();
        this.message = '';
        this.isAdminUser = false;
    }
    ngOnInit() {
        if (this.authService.role === 'ADMIN') {
            this.isAdminUser = true;
        }
        this.authService.roleSetEvent.subscribe(next => {
            if (next === 'ADMIN') {
                this.isAdminUser = true;
            }
            else {
                this.isAdminUser = false;
            }
        });
    }
    editCinemaHall() {
        this.router.navigate(['admin', 'cinemaHalls'], { queryParams: { action: 'edit', id: this.cinemaHall.id } });
    }
    deleteCinemaHall() {
        const result = confirm('Are you sure you wish to delete this hall?');
        if (result) {
            this.message = 'Deleting...';
            this.dataService.deleteCinemaHall(this.cinemaHall.id).subscribe(next => {
                this.dataChangedEvent.emit();
                this.router.navigate(['admin', 'cinema-halls']);
            }, error => {
                this.message = 'Sorry - this hall cannot be deleted at this time.';
            });
        }
    }
};
tslib_1.__decorate([
    Input()
], CinemaHallDetailComponent.prototype, "cinemaHall", void 0);
tslib_1.__decorate([
    Output()
], CinemaHallDetailComponent.prototype, "dataChangedEvent", void 0);
CinemaHallDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cinema-hall-detail',
        templateUrl: './cinema-hall-detail.component.html',
        styleUrls: ['./cinema-hall-detail.component.css']
    })
], CinemaHallDetailComponent);
export { CinemaHallDetailComponent };
//# sourceMappingURL=cinema-hall-detail.component.js.map