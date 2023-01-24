import {Injectable} from '@angular/core';
import {CinemaHall, Layout} from './model/CinemaHall';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {Film} from './model/Film';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, retry} from 'rxjs/operators';
import {City} from './model/City';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //replace wtih restApiGW
  getCinemaHalls(): Observable<Array<CinemaHall>> {
    return this.http.get<Array<CinemaHall>>(environment.restUrl + '/api/v1/cinemaHalls', {withCredentials: true}).pipe(
      map(data => {
          const cinemaHalls = new Array<CinemaHall>();
          for (const cinemaHall of data) {
            cinemaHalls.push(CinemaHall.fromHttp(cinemaHall));
          }
          return cinemaHalls;
        }
      )
    );
  }


  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/v1/users', {withCredentials: true})
      .pipe(
        map(data => {
          const users = new Array<User>();
          for (const user of data) {
            users.push(User.fromHttp(user));
          }
          return users;
        })
      );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.restUrl + '/api/v1/users/' + user.id, user, {withCredentials: true});
  }

  addUser(newUser: User, password: string): Observable<User> {
    const fullUser = {id: newUser.id, name: newUser.name, email: newUser.email, password: password};
    console.log('addUser From data.service');
    return this.http.post<User>(environment.restUrl + '/api/v1/users', fullUser, {withCredentials: true});
  }

  private getCorrectedCinemaHall(cinemaHall: CinemaHall) {
    const correctedRoom = {id: cinemaHall.id, name: cinemaHall.name, location: cinemaHall.location, capacities: []};

    for (const lc of cinemaHall.capacities) {

      let correctLayout;

      for (let layoutKey in Layout) {
        if (Layout[layoutKey] === lc.layout) {
          correctLayout = layoutKey;
        }
      }

      const correctedLayout = {layout: correctLayout, capacity: lc.capacity};
      correctedRoom.capacities.push(correctedLayout);
    }
    return correctedRoom;
  }

  updateCinemaHall(cinemaHall: CinemaHall): Observable<CinemaHall> {
    return this.http.put<CinemaHall>(environment.restUrl + '/api/v1/cinemaHalls/' + cinemaHall.id, this.getCorrectedCinemaHall(cinemaHall), {withCredentials: true});
  }

  addCinemaHall(newCinemaHall: CinemaHall): Observable<CinemaHall> {
    return this.http.post<CinemaHall>(environment.restUrl + '/api/v1/cinemaHalls', this.getCorrectedCinemaHall(newCinemaHall), {withCredentials: true});
  }

  deleteCinemaHall(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/v1/cinemaHalls/' + id, {withCredentials: true});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/v1/users/' + id, {withCredentials: true});
  }

  resetUserPassword(id: number): Observable<any> {
    return this.http.get(environment.restUrl + '/api/v1/users/resetPassword/' + id, {withCredentials: true});
  }

  getFilms(date: string): Observable<Array<Film>> {
    return this.http.get<Array<Film>>(environment.restUrl + '/api/v1/filmsWithDate/' + date)
      .pipe(
        map(data => {
          const films = new Array<Film>();
          for (const film of data) {
            films.push(Film.fromHttp(film));
          }
          return films;
        })
      );
  }


  getFilm(id: number): Observable<Film> {
    return this.http.get<Film>(environment.restUrl + '/api/v1/filmsWithParams?filmId=' + id, {withCredentials: true}).pipe(
      map(
        data => Film.fromHttp(data))
    );
  }

  getCity(): Observable<City> {
    return this.http.get<City>(environment.restUrl + '/api/v1/cities/' + 2, {withCredentials: true})
      .pipe(
        map(
          data => {
            return City.fromHttp(data);
          }
        )
      );
  }


  getCorrectFilm(film: Film) {
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

  saveFilm(film: Film): Observable<Film> {
    return this.http.put<Film>(environment.restUrl + '/api/v1/films/' + film.id, this.getCorrectFilm(film), {withCredentials: true});
  }

  addFilm(newFilm: Film): Observable<Film> {
    return this.http.post<Film>(environment.restUrl + '/api/v1/films', this.getCorrectFilm(newFilm), {withCredentials: true});
  }

  deleteFilm(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/v1/films/' + id, {withCredentials: true});
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.restUrl + '/api/users/' + id)
      .pipe(
        map(data => {
          return User.fromHttp(data);
        })
      );
  }


  validateUser(name: string, password: string): Observable<{ result: string }> {
    const authData = btoa(`${name}:${password}`);
    const headerse = new HttpHeaders().append(
      'Authorization', 'Basic ' + authData
    );
    return this.http.get<{ result: string }>(environment.restUrl + '/api/basicAuth/validate', {headers: headerse, withCredentials: true});
  }

  getRole(): Observable<{ role: string }> {
    const headers = new HttpHeaders().append('X-Requested-With', 'XMLHttpRequest');
    return this.http.get<{ role: string }>(environment.restUrl + '/api/v1/users/currentUserRole', {headers, withCredentials: true});
  }

  logOut(): Observable<string> {
    return this.http.get<string>(environment.restUrl + '/api/v1/logout', {withCredentials: true});

  }


  constructor(private http: HttpClient) {
    console.log(environment.restUrl);
  }
}
