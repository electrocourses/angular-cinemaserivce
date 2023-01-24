import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let PreFetchCinemaHallsService = class PreFetchCinemaHallsService {
    constructor(dataService) {
        this.dataService = dataService;
    }
    resolve() {
        return this.dataService.getCinemaHalls();
    }
};
PreFetchCinemaHallsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PreFetchCinemaHallsService);
export { PreFetchCinemaHallsService };
//# sourceMappingURL=pre-fetch-cinema-halls.service.js.map