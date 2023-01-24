import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CinemaHall, Layout } from './model/CinemaHall';
import { User } from './model/User';
import { Film } from './model/Film';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { City } from './model/City';
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        console.log(environment.restUrl);
    }
    //replace wtih restApiGW
    getCinemaHalls() {
        return this.http.get(environment.restApiGW + '/api/v1/cinemaHalls', { withCredentials: true }).pipe(map(data => {
            const cinemaHalls = new Array();
            for (const cinemaHall of data) {
                cinemaHalls.push(CinemaHall.fromHttp(cinemaHall));
            }
            return cinemaHalls;
        }));
    }
    getUsers() {
        return this.http.get(environment.restUrl + '/api/v1/users', { withCredentials: true })
            .pipe(map(data => {
            const users = new Array();
            for (const user of data) {
                users.push(User.fromHttp(user));
            }
            return users;
        }));
    }
    updateUser(user) {
        return this.http.put(environment.restUrl + '/api/v1/users/' + user.id, user, { withCredentials: true });
    }
    addUser(newUser, password) {
        const fullUser = { id: newUser.id, name: newUser.name, email: newUser.email, password: password };
        console.log('addUser From data.service');
        return this.http.post(environment.restApiGW + '/api/v1/users', fullUser, { withCredentials: true });
    }
    getCorrectedCinemaHall(cinemaHall) {
        const correctedRoom = { id: cinemaHall.id, name: cinemaHall.name, location: cinemaHall.location, capacities: [] };
        for (const lc of cinemaHall.capacities) {
            let correctLayout;
            for (let layoutKey in Layout) {
                if (Layout[layoutKey] === lc.layout) {
                    correctLayout = layoutKey;
                }
            }
            const correctedLayout = { layout: correctLayout, capacity: lc.capacity };
            correctedRoom.capacities.push(correctedLayout);
        }
        return correctedRoom;
    }
    updateCinemaHall(cinemaHall) {
        return this.http.put(environment.restUrl + '/api/v1/cinemaHalls/' + cinemaHall.id, this.getCorrectedCinemaHall(cinemaHall), { withCredentials: true });
    }
    addCinemaHall(newCinemaHall) {
        return this.http.post(environment.restUrl + '/api/v1/cinemaHalls', this.getCorrectedCinemaHall(newCinemaHall), { withCredentials: true });
    }
    deleteCinemaHall(id) {
        return this.http.delete(environment.restUrl + '/api/v1/cinemaHalls/' + id, { withCredentials: true });
    }
    deleteUser(id) {
        return this.http.delete(environment.restUrl + '/api/v1/users/' + id, { withCredentials: true });
    }
    resetUserPassword(id) {
        return this.http.get(environment.restUrl + '/api/v1/users/resetPassword/' + id, { withCredentials: true });
    }
    getFilms(date) {
        return this.http.get(environment.restUrl + '/api/v1/filmsWithDate/' + date)
            .pipe(map(data => {
            const films = new Array();
            for (const film of data) {
                films.push(Film.fromHttp(film));
            }
            return films;
        }));
    }
    getFilm(id) {
        return this.http.get(environment.restUrl + '/api/v1/filmsWithParams?filmId=' + id, { withCredentials: true }).pipe(map(data => Film.fromHttp(data)));
    }
    getCity() {
        return this.http.get(environment.restUrl + '/api/v1/cities/' + 2, { withCredentials: true })
            .pipe(map(data => {
            return City.fromHttp(data);
        }));
    }
    //TODO: replace with load balancer restApiGW
    getAllCities() {
        return this.http.get(environment.restApiGW + '/api/v1/cities', { withCredentials: true })
            .pipe(map(data => {
            console.log('From service: ', data);
            const cities = new Array();
            for (const city of data) {
                cities.push(City.fromHttp(city));
            }
            return cities;
        }));
    }
    getCorrectFilm(film) {
        let correctLayout;
        for (let member in Layout) {
            if (Layout[member] === film.layout) {
                correctLayout = member;
            }
        }
        if (film.startTime.length < 8) {
            film.startTime = film.startTime + ':00';
        }
        if (film.endTime.length < 8) {
            film.endTime = film.endTime + ':00';
        }
        const correctFilm = {
            id: film.id,
            cinemaHall: this.getCorrectedCinemaHall(film.cinemaHall),
            user: film.user,
            title: film.title,
            date: film.date,
            startTime: film.startTime,
            endTime: film.endTime,
            participants: film.participants,
            layout: correctLayout
        };
        return correctFilm;
    }
    saveFilm(film) {
        return this.http.put(environment.restUrl + '/api/v1/films/' + film.id, this.getCorrectFilm(film), { withCredentials: true });
    }
    addFilm(newFilm) {
        return this.http.post(environment.restUrl + '/api/v1/films', this.getCorrectFilm(newFilm), { withCredentials: true });
    }
    deleteFilm(id) {
        return this.http.delete(environment.restUrl + '/api/v1/films/' + id, { withCredentials: true });
    }
    getUser(id) {
        return this.http.get(environment.restUrl + '/api/users/' + id)
            .pipe(map(data => {
            return User.fromHttp(data);
        }));
    }
    validateUser(name, password) {
        const authData = btoa(`${name}:${password}`);
        const headerse = new HttpHeaders().append('Authorization', 'Basic ' + authData);
        return this.http.get(environment.restApiGW + '/api/basicAuth/validate', { headers: headerse, withCredentials: true });
    }
    getRole() {
        const headers = new HttpHeaders().append('X-Requested-With', 'XMLHttpRequest');
        return this.http.get(environment.restApiGW + '/api/v1/users/currentUserRole', { headers, withCredentials: true });
    }
    logOut() {
        return this.http.get(environment.restApiGW + '/api/v1/logout', { withCredentials: true });
    }
};
DataService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map