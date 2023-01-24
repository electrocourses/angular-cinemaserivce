import { CinemaHall, Layout } from './CinemaHall';
import { User } from './User';
export class Film {
    static fromHttp(film) {
        const newFilm = new Film();
        newFilm.id = film.id;
        newFilm.cinemaHall = CinemaHall.fromHttp(film.cinemaHall);
        newFilm.user = User.fromHttp(film.user);
        newFilm.layout = Layout[film.layout];
        newFilm.title = film.title;
        newFilm.date = film.date;
        newFilm.startTime = film.startTime;
        newFilm.endTime = film.endTime;
        newFilm.participants = film.participants;
        return newFilm;
    }
    getDateAsDate() {
        return new Date();
    }
}
//# sourceMappingURL=Film.js.map