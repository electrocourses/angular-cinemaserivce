import {Injectable} from '@angular/core';
import {CinemaHall, Layout, LayoutCapacity} from './model/CinemaHall';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {Film} from './model/Film';
import {formatDate} from '@angular/common';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cinemaHalls: Array<CinemaHall>;
  private users: Array<User>;
  private films: Array<Film>;

  getCinemaHalls(): Observable<Array<CinemaHall>> {
    return of(this.cinemaHalls);
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  updateUser(user: User): Observable<User> {
    const userToSave = this.users.find(userToFind => userToFind.id === user.id);
    userToSave.name = user.name;
    return of(userToSave);
  }

  addUser(user: User, password: string): Observable<User> {
    let id = 0;
    for (const findUser of this.users) {
      if (findUser.id > id) {
        id = findUser.id;
      }
    }
    user.id = id + 1;

    this.users.push(user);

    return of(user);
  }

  updateCinemaHall(cinemaHall: CinemaHall): Observable<CinemaHall> {
    const cinemaHallToSave = this.cinemaHalls.find(hall => hall.id === cinemaHall.id);
    cinemaHallToSave.name = cinemaHall.name;
    cinemaHallToSave.location = cinemaHall.location;
    return of(cinemaHallToSave);
  }

  addCinemaHall(newCinemaHall: CinemaHall): Observable<CinemaHall> {
    let id = 0;
    for (const room of this.cinemaHalls) {
      if (room.id > id) {
        id = room.id;
      }
    }

    newCinemaHall.id = id + 1;
    this.cinemaHalls.push(newCinemaHall);
    return of(newCinemaHall);
  }

  deleteCinemaHall(id: number): Observable<any> {
    const cinemaHall = this.cinemaHalls.find(hall => hall.id === id);
    this.cinemaHalls.splice(this.cinemaHalls.indexOf(cinemaHall), 1);
    return of(null);
  }

  deleteUser(id: number): Observable<any> {
    const user = this.users.find(u => u.id === id);
    this.users.splice(this.users.indexOf(user), 1);
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  getFilms(date: string): Observable<Array<Film>> {
    return of(this.films.filter(f => f.date === date));
  }

  getFilm(id: number): Observable<Film> {
    return of(this.films.find(f => f.id === id));
  }

  saveFilm(film: Film): Observable<Film> {
    const newFilm = this.films.find(f => f.id === film.id);
    newFilm.date = film.date;
    newFilm.startTime = film.startTime;
    newFilm.endTime = film.endTime;
    newFilm.title = film.title;
    newFilm.layout = film.layout;
    newFilm.cinemaHall = film.cinemaHall;
    newFilm.user = film.user;
    newFilm.participants = film.participants;
    return of(newFilm);
  }

  addFilm(newFilm: Film): Observable<Film> {
    let id = 0;
    for (const film of this.films) {
      if (film.id > id) {
        id = film.id;
      }
    }
    newFilm.id = id + 1;
    this.films.push(newFilm);
    return of(newFilm);
  }

  deleteFilm(id: number): Observable<any> {
    const film = this.films.find(b => b.id === id);
    this.films.splice(this.films.indexOf(film), 1);
    return of(null);
  }

  validateUser(name: string, password: string): Observable<{ result: string }> {

    return of({result: 'ok'});
  }

  getRole(): Observable<{role: string}> {
    return of({role: 'ADMIN'});
  }

  logOut(): Observable<string> {
    return of('');
  }

  constructor() {
    this.films = new Array<Film>();
    this.cinemaHalls = new Array<CinemaHall>();
    this.users = new Array<User>();

    const cinemaHall1 = new CinemaHall();

    cinemaHall1.id = 1;
    cinemaHall1.name = 'First hall';
    cinemaHall1.location = 'First flor';

    const capacity1 = new LayoutCapacity();

    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 15;

    const capacity2 = new LayoutCapacity();

    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;


    cinemaHall1.capacities.push(capacity1);
    cinemaHall1.capacities.push(capacity2);

    const cinemaHall2 = new CinemaHall();

    cinemaHall2.id = 2;
    cinemaHall2.name = 'Second hall';
    cinemaHall2.location = 'Third flor';

    const capacity3 = new LayoutCapacity();

    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;


    const user1 = new User();
    user1.id = 1;
    user1.name = 'matt';

    const user2 = new User();
    user2.id = 2;
    user2.name = 'Diana';

    const user3 = new User();
    user3.id = 3;
    user3.name = 'Suzan';

    const film1 = new Film();
    film1.id = 1;
    film1.cinemaHall = cinemaHall1;
    film1.user = user1;
    film1.layout = Layout.THEATER;
    film1.title = 'Example meeting';
    film1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    film1.startTime = '11:30';
    film1.endTime = '12:30';
    film1.participants = 12;

    const film2 = new Film();
    film2.id = 2;
    film2.cinemaHall = cinemaHall1;
    film2.user = user2;
    film2.layout = Layout.USHAPE;
    film2.title = 'Another meeting';
    film2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    film2.startTime = '14:00';
    film2.endTime = '15:00';
    film2.participants = 5;


    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);

    cinemaHall2.capacities.push(capacity3);


    cinemaHall1.capacities.push(capacity1);
    cinemaHall2.capacities.push(capacity3);

    this.cinemaHalls.push(cinemaHall1);
    this.cinemaHalls.push(cinemaHall2);

    this.films.push(film1);
    this.films.push(film2);
  }


}
