import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(authService, route, activatedRoute) {
        this.authService = authService;
        this.route = route;
        this.activatedRoute = activatedRoute;
        this.message = '';
    }
    ngOnInit() {
        console.log('Navigation URL: ' + this.route.navigateByUrl(this.activatedRoute.snapshot.queryParams['requested']));
        this.subscription = this.authService.authenticationResultEvent.subscribe(result => {
            if (result) {
                const url = this.activatedRoute.snapshot.queryParams['requested'];
                this.route.navigateByUrl(url);
            }
            else {
                this.message = 'Your username or password was not recognised - try again.';
            }
        });
        this.authService.checkIfAlreadyAuthenticated();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onSubmit() {
        this.authService.authenticate(this.name, this.password);
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map