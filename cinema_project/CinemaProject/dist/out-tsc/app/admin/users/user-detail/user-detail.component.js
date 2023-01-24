import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let UserDetailComponent = class UserDetailComponent {
    constructor(router, dataService, authService) {
        this.router = router;
        this.dataService = dataService;
        this.authService = authService;
        this.dataChangedEvent = new EventEmitter();
        this.message = '';
        this.isAdminUser = false;
    }
    ngOnInit() {
        if (this.authService.role === 'ADMIN') {
            this.isAdminUser = true;
        }
        this.authService.roleSetEvent.subscribe(next => {
            if (next === 'ADMIN') {
                this.isAdminUser = true;
            }
            else {
                this.isAdminUser = false;
            }
        });
    }
    editUser() {
        this.router.navigate(['admin', 'users'], { queryParams: { action: 'edit', id: this.user.id } });
    }
    deleteUser() {
        const result = confirm('Are you sure you wish to delete this user?');
        if (result) {
            this.message = 'deleting...';
            this.dataService.deleteUser(this.user.id).subscribe(next => {
                this.dataChangedEvent.emit();
                this.router.navigate(['admin', 'users']);
            }, error => {
                this.message = 'Sorry, this user cannot be deleted at this time.';
            });
        }
    }
    resetPassword() {
        this.message = 'please wait...';
        this.dataService.resetUserPassword(this.user.id).subscribe(next => this.message = 'The password has been reset.', error => this.message = 'Sorry, something went wrong.');
    }
};
tslib_1.__decorate([
    Input()
], UserDetailComponent.prototype, "user", void 0);
tslib_1.__decorate([
    Output()
], UserDetailComponent.prototype, "dataChangedEvent", void 0);
UserDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-detail',
        templateUrl: './user-detail.component.html',
        styleUrls: ['./user-detail.component.css']
    })
], UserDetailComponent);
export { UserDetailComponent };
//# sourceMappingURL=user-detail.component.js.map