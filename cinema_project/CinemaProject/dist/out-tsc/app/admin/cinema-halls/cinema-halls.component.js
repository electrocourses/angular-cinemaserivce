import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CinemaHall } from '../../model/CinemaHall';
let CinemaHallsComponent = class CinemaHallsComponent {
    constructor(dataService, route, router, formResetService, authService) {
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.formResetService = formResetService;
        this.authService = authService;
        this.loadingData = true;
        this.message = 'Please wait... getting the list of halls';
        this.loadingAttempts = 0;
        this.isAdminUser = false;
    }
    loadData() {
        this.dataService.getCinemaHalls().subscribe(next => {
            this.cinemaHalls = next;
            this.loadingData = false;
            this.processUrlParams();
        }, error => {
            if (error.status === 402) {
                this.message = 'Sorry - you need to pay to use this application.';
            }
            else {
                this.loadingAttempts++;
                if (this.loadingAttempts <= 10) {
                    this.message = 'Sorry - something went wrong, trying again.... please wait ';
                    this.loadData();
                }
                else {
                    this.message = 'Sorry - something went wrong, please contact support.';
                }
            }
        });
    }
    processUrlParams() {
        this.route.queryParams.subscribe((params) => {
            this.action = null;
            const id = params['id'];
            if (id) {
                this.selectedCinemaHall = this.cinemaHalls.find(cinemaHall => cinemaHall.id === +id);
                this.action = params['action'];
            }
            if (params['action'] === 'add') {
                this.selectedCinemaHall = new CinemaHall();
                this.action = 'edit';
                this.formResetService.cinemaHallEventEmitter.emit(this.selectedCinemaHall);
            }
        });
    }
    ngOnInit() {
        this.loadData();
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
    setCinemaHall(id) {
        this.router.navigate(['admin', 'cinemaHalls'], { queryParams: { id, action: 'view' } });
    }
    addCinemaHall() {
        this.router.navigate(['admin', 'cinemaHalls'], { queryParams: { action: 'add' } });
    }
};
CinemaHallsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cinema-halls',
        templateUrl: './cinema-halls.component.html',
        styleUrls: ['./cinema-halls.component.css']
    })
], CinemaHallsComponent);
export { CinemaHallsComponent };
//# sourceMappingURL=cinema-halls.component.js.map