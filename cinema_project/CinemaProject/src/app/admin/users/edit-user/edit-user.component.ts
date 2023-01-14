import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../../model/User';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../form-reset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  @Input()
  user: User;

  @Output()
  dataChangedEvent = new EventEmitter();

  formUser: User;
  message: string;
  password: string;
  password2: string;
  nameIsValid = false;
  passwordsAreValid = false;
  passwordsAreMatch = false;
  userResetSubscription: Subscription;
  emailIsValid = false;


  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) {
  }

  ngOnInit() {
    this.initializeForm();
    this.userResetSubscription = this.formResetService.userEventEmitter.subscribe(
      next => {
        this.user = next;
        this.initializeForm();
      }
    );
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
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        },
        error => {
          this.message = 'Something went wrong and the data wasn\'t saved. You may want to try again.';
        }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }, error => {
          this.message = 'Something went wrong and the data wasn\'t saved. You may want to try again.';
        }
      );
    }
  }


  checkIfNameIsValid() {
    if (this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfEmailIsValid() {
    if (this.formUser.email) {
      this.emailIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.emailIsValid = false;
    }

  }

  checkIfPasswordsAreValid() {
    if (this.formUser.id != null) {
      this.passwordsAreValid = true;
      this.passwordsAreMatch = true;
    } else {
      this.passwordsAreMatch = this.password === this.password2;
      if (this.password) {
        this.passwordsAreValid = this.password.trim().length > 0;
      } else {
        this.passwordsAreValid = false;
      }
    }
  }
}
