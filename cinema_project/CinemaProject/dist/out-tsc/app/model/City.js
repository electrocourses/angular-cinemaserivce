import { CinemaHall } from './CinemaHall';
export class City {
    static fromHttp(city) {
        const newCity = new City();
        newCity.id = city.id;
        newCity.name = city.name;
        newCity.address = city.address;
        newCity.cinemaHallDto = new CinemaHall();
        newCity.cinemaHallDto = CinemaHall.fromHttp(city.cinemaHallDto);
        return newCity;
    }
}
//# sourceMappingURL=City.js.map