import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  isUserLoggedIn = false;

  constructor(private router: Router,
              private authService: AuthService) {
  }


  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.isUserLoggedIn = true;
    }
    this.authService.authenticationResultEvent.subscribe(
      next => {
        this.isUserLoggedIn = next;
      }
    );
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
}
