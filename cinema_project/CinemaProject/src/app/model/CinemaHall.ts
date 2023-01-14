export class CinemaHall {
  id: number;
  name: string;
  location: string;
  capacities = Array<LayoutCapacity>();

  static fromHttp(cinemaHall: CinemaHall) {
    const newCinemaHall = new CinemaHall();
    newCinemaHall.id = cinemaHall.id;
    newCinemaHall.name = cinemaHall.name;
    newCinemaHall.location = cinemaHall.location;
    newCinemaHall.capacities = new Array<LayoutCapacity>();
    for (const lc of cinemaHall.capacities) {
      newCinemaHall.capacities.push(LayoutCapacity.fromHttp(lc));
    }
    return newCinemaHall;
  }
}


export class LayoutCapacity {
  layout: Layout;
  capacity: number;

  static fromHttp(lc: LayoutCapacity) {
    const newLc = new LayoutCapacity();
    newLc.capacity = lc.capacity;
    newLc.layout = Layout[lc.layout];
    return newLc;
  }
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board meeting'
}
