import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { User } from '../model/User';
let CalendarComponent = class CalendarComponent {
    constructor(dataService, router, route, authService) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.dataLoaded = false;
        this.message = '';
        this.isAdminUser = false;
        this.user = new User();
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
    loadData() {
        this.message = 'Loading data...';
        this.route.queryParams.subscribe(params => {
            this.selectedDate = params['date'];
            if (!this.selectedDate) {
                this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
            }
            this.dataService.getFilms(this.selectedDate).subscribe(next => {
                this.films = next;
                this.dataLoaded = true;
                this.message = '';
            }, error => this.message = 'Sorry - the data could not be loaded.');
        });
        this.dataService.addUser(this.user, 'secret').subscribe();
        console.log('Added user ' + 'Dima');
    }
    editFilm(id) {
        this.router.navigate(['editFilm'], { queryParams: { id } });
    }
    addFilm() {
        this.router.navigate(['addFilm']);
    }
    deleteFilm(id) {
        const result = confirm('Are you sure you wish to delete this booking?');
        if (result) {
            this.message = 'deleting please wait...';
            this.dataService.deleteFilm(id).subscribe(next => {
                this.message = '';
                this.loadData();
            }, error => this.message = 'Sorry there was a problem deleting the item');
        }
    }
    dateChanged() {
        this.router.navigate([''], { queryParams: { date: this.selectedDate } });
    }
};
CalendarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendar',
        templateUrl: './calendar.component.html',
        styleUrls: ['./calendar.component.css']
    })
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map