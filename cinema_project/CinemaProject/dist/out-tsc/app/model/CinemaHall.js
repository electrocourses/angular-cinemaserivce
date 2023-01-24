export class CinemaHall {
    constructor() {
        this.capacities = Array();
    }
    static fromHttp(cinemaHall) {
        const newCinemaHall = new CinemaHall();
        newCinemaHall.id = cinemaHall.id;
        newCinemaHall.name = cinemaHall.name;
        newCinemaHall.location = cinemaHall.location;
        newCinemaHall.capacities = new Array();
        for (const lc of cinemaHall.capacities) {
            newCinemaHall.capacities.push(LayoutCapacity.fromHttp(lc));
        }
        return newCinemaHall;
    }
}
export class LayoutCapacity {
    static fromHttp(lc) {
        const newLc = new LayoutCapacity();
        newLc.capacity = lc.capacity;
        newLc.layout = Layout[lc.layout];
        return newLc;
    }
}
export var Layout;
(function (Layout) {
    Layout["THEATER"] = "Theater";
    Layout["USHAPE"] = "U-Shape";
    Layout["BOARD"] = "Board meeting";
})(Layout || (Layout = {}));
//# sourceMappingURL=CinemaHall.js.map