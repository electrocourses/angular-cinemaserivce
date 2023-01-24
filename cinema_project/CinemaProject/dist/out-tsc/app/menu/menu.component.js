import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let MenuComponent = class MenuComponent {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
        this.isUserLoggedIn = false;
    }
    ngOnInit() {
        if (this.authService.isAuthenticated) {
            this.isUserLoggedIn = true;
        }
        this.authService.authenticationResultEvent.subscribe(next => {
            this.isUserLoggedIn = next;
        });
    }
    navigateToCinemaHallsAdmin() {
        this.router.navigate(['admin', 'cinemaHalls']);
    }
    navigateToUsersAdmin() {
        this.router.navigate(['admin', 'users']);
    }
    navigateToCities() {
        this.router.navigate(['admin', 'cities']);
    }
    navigateToHome() {
        this.router.navigate(['']);
    }
    logOut() {
        this.authService.logOut();
        this.navigateToHome();
    }
};
MenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menu',
        templateUrl: './menu.component.html',
        styleUrls: ['./menu.component.css']
    })
], MenuComponent);
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map