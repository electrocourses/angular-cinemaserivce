import {CinemaHall} from './CinemaHall';

export class City {
  id: number;
  name: string;
  address: string;
  cinemaHallId: number;
  cinemaHallDto: CinemaHall;

  static fromHttp(city: City) {

    const newCity = new City();
    newCity.id = city.id;
    newCity.name = city.name;
    newCity.address = city.address;
    newCity.cinemaHallDto = new CinemaHall();
    newCity.cinemaHallDto = CinemaHall.fromHttp(city.cinemaHallDto);

    return newCity;
  }
}
