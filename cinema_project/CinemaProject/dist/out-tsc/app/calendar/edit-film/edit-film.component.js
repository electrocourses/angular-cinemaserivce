import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Film } from '../../model/Film';
import { Layout } from '../../model/CinemaHall';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
let EditFilmComponent = class EditFilmComponent {
    constructor(dataService, route, router) {
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.layouts = Object.keys(Layout);
        this.layoutEnum = Layout;
        this.dataLoaded = false;
        this.message = 'Please wait...Data loading...';
        this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
        this.isDataValid = false;
    }
    ngOnInit() {
        this.cinemaHalls = this.route.snapshot.data.cinemaHalls;
        this.users = this.route.snapshot.data.users;
        const id = this.route.snapshot.queryParams.id;
        if (id) {
            this.dataService.getFilm(+id).pipe(map(film => {
                film.cinemaHall = this.cinemaHalls.find(hall => hall.id === film.cinemaHall.id);
                film.user = this.users.find(user => user.id === film.user.id);
                return film;
            })).subscribe(next => {
                this.film = next;
                this.dataLoaded = true;
                this.message = '';
            });
        }
        else {
            this.film = new Film();
            this.dataLoaded = true;
            this.message = '';
        }
    }
    onSubmit() {
        if (this.film.id != null) {
            this.dataService.saveFilm(this.film).subscribe(next => this.router.navigate(['']), error => this.message = 'something went wrong : the film wasn\'t saved.');
        }
        else {
            this.dataService.addFilm(this.film).subscribe(next => this.router.navigate(['']), error => this.message = 'something went wrong : the film wasn\'t saved.');
        }
    }
    checkIfDateIsValid() {
        console.log('Current date', this.currentDate);
        console.log('Selected date date', this.film.date);
        // TODO make date validation
    }
};
EditFilmComponent = tslib_1.__decorate([
    Component({
        selector: 'app-edit-film',
        templateUrl: './edit-film.component.html',
        styleUrls: ['./edit-film.component.css']
    })
], EditFilmComponent);
export { EditFilmComponent };
//# sourceMappingURL=edit-film.component.js.map