import * as tslib_1 from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
let FormResetService = class FormResetService {
    constructor() {
        this.cinemaHallEventEmitter = new EventEmitter();
        this.userEventEmitter = new EventEmitter();
    }
};
FormResetService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], FormResetService);
export { FormResetService };
//# sourceMappingURL=form-reset.service.js.map