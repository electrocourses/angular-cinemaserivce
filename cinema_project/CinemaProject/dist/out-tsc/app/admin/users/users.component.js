import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { User } from '../../model/User';
let UsersComponent = class UsersComponent {
    constructor(dataService, route, router, formResetService, authService) {
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.formResetService = formResetService;
        this.authService = authService;
        this.message = 'Loading data...Please wait';
        this.loadingData = true;
        this.isAdminUser = false;
    }
    ngOnInit() {
        this.loadData();
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
    loadData() {
        this.dataService.getUsers().subscribe(next => {
            this.users = next;
            this.loadingData = false;
            this.route.queryParams.subscribe((params) => {
                const id = params['id'];
                this.action = params['action'];
                if (id) {
                    this.selectedUser = this.users.find(user => user.id === +id);
                }
            });
        }, error => {
            this.message = 'An error occurred - please contact support';
        });
    }
    selectUser(id) {
        this.router.navigate(['admin', 'users'], { queryParams: { id, action: 'view' } });
    }
    addUser() {
        this.selectedUser = new User();
        this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
        this.formResetService.userEventEmitter.emit(this.selectedUser);
    }
};
UsersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.css']
    })
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map