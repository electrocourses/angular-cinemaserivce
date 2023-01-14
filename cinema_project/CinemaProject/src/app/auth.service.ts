import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  role: string;
  roleSetEvent = new EventEmitter<string>();

  constructor(private dataService: DataService) {
  }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.setupRole();
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      }, error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );
  }

  setupRole() {
    this.dataService.getRole().subscribe(
      data => {
        this.role = data.role;
        this.roleSetEvent.emit(data.role);
      }
    );
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      data => {
        if (data.role !== '') {
          this.role = data.role;
          this.roleSetEvent.emit(data.role);
          this.isAuthenticated = true;
          this.authenticationResultEvent.emit(true);
        }
      }
    );
  }

  logOut() {
    this.dataService.logOut().subscribe();
    this.isAuthenticated = false;
    this.authenticationResultEvent.emit(false);
  }

}
