import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let EditUserComponent = class EditUserComponent {
    constructor(dataService, router, formResetService) {
        this.dataService = dataService;
        this.router = router;
        this.formResetService = formResetService;
        this.dataChangedEvent = new EventEmitter();
        this.nameIsValid = false;
        this.passwordsAreValid = false;
        this.passwordsAreMatch = false;
        this.emailIsValid = false;
    }
    ngOnInit() {
        this.initializeForm();
        this.userResetSubscription = this.formResetService.userEventEmitter.subscribe(next => {
            this.user = next;
            this.initializeForm();
        });
    }
    ngOnDestroy() {
        this.userResetSubscription.unsubscribe();
    }
    initializeForm() {
        this.formUser = Object.assign({}, this.user);
        this.checkIfNameIsValid();
        this.checkIfPasswordsAreValid();
        this.checkIfEmailIsValid();
    }
    onSubmit() {
        this.message = 'Saving data...';
        if (this.formUser.id == null) {
            this.dataService.addUser(this.formUser, this.password).subscribe((user) => {
                this.dataChangedEvent.emit();
                this.router.navigate(['admin', 'users'], { queryParams: { action: 'view', id: user.id } });
            }, error => {
                this.message = 'Something went wrong and the data wasn\'t saved. You may want to try again.';
            });
        }
        else {
            this.dataService.updateUser(this.formUser).subscribe((user) => {
                this.dataChangedEvent.emit();
                this.router.navigate(['admin', 'users'], { queryParams: { action: 'view', id: user.id } });
            }, error => {
                this.message = 'Something went wrong and the data wasn\'t saved. You may want to try again.';
            });
        }
    }
    checkIfNameIsValid() {
        if (this.formUser.name) {
            this.nameIsValid = this.formUser.name.trim().length > 0;
        }
        else {
            this.nameIsValid = false;
        }
    }
    checkIfEmailIsValid() {
        if (this.formUser.email) {
            this.emailIsValid = this.formUser.name.trim().length > 0;
        }
        else {
            this.emailIsValid = false;
        }
    }
    checkIfPasswordsAreValid() {
        if (this.formUser.id != null) {
            this.passwordsAreValid = true;
            this.passwordsAreMatch = true;
        }
        else {
            this.passwordsAreMatch = this.password === this.password2;
            if (this.password) {
                this.passwordsAreValid = this.password.trim().length > 0;
            }
            else {
                this.passwordsAreValid = false;
            }
        }
    }
};
tslib_1.__decorate([
    Input()
], EditUserComponent.prototype, "user", void 0);
tslib_1.__decorate([
    Output()
], EditUserComponent.prototype, "dataChangedEvent", void 0);
EditUserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-edit-user',
        templateUrl: './edit-user.component.html',
        styleUrls: ['./edit-user.component.css']
    })
], EditUserComponent);
export { EditUserComponent };
//# sourceMappingURL=edit-user.component.js.map