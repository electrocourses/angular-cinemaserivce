import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let PreFetchUsersService = class PreFetchUsersService {
    constructor(dataService) {
        this.dataService = dataService;
    }
    resolve() {
        return this.dataService.getUsers();
    }
};
PreFetchUsersService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PreFetchUsersService);
export { PreFetchUsersService };
//# sourceMappingURL=pre-fetch-users.service.js.map