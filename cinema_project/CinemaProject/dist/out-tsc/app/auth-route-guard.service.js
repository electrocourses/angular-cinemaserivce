import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthRouteGuardService = class AuthRouteGuardService {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        if (!this.authService.isAuthenticated) {
            this.router.navigate(['login'], { queryParams: { requested: state.url } });
        }
        return this.authService.isAuthenticated;
    }
};
AuthRouteGuardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthRouteGuardService);
export { AuthRouteGuardService };
//# sourceMappingURL=auth-route-guard.service.js.map