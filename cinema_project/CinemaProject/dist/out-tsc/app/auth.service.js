import * as tslib_1 from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
let AuthService = class AuthService {
    constructor(dataService) {
        this.dataService = dataService;
        this.isAuthenticated = false;
        this.authenticationResultEvent = new EventEmitter();
        this.roleSetEvent = new EventEmitter();
    }
    authenticate(name, password) {
        this.dataService.validateUser(name, password).subscribe(next => {
            this.setupRole();
            this.isAuthenticated = true;
            this.authenticationResultEvent.emit(true);
        }, error => {
            this.isAuthenticated = false;
            this.authenticationResultEvent.emit(false);
        });
    }
    setupRole() {
        this.dataService.getRole().subscribe(data => {
            this.role = data.role;
            this.roleSetEvent.emit(data.role);
        });
    }
    checkIfAlreadyAuthenticated() {
        this.dataService.getRole().subscribe(data => {
            if (data.role !== '') {
                this.role = data.role;
                this.roleSetEvent.emit(data.role);
                this.isAuthenticated = true;
                this.authenticationResultEvent.emit(true);
            }
        });
    }
    logOut() {
        this.dataService.logOut().subscribe();
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map