import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {CinemaHall} from '../../model/CinemaHall';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from '../../form-reset.service';
import {AuthService} from '../../auth.service';
import {audit} from 'rxjs/operators';

@Component({
  selector: 'app-cinema-halls',
  templateUrl: './cinema-halls.component.html',
  styleUrls: ['./cinema-halls.component.css']
})
export class CinemaHallsComponent implements OnInit {

  cinemaHalls: Array<CinemaHall>;
  selectedCinemaHall: CinemaHall;
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of halls';
  loadingAttempts = 0;
  isAdminUser = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService,
              private authService: AuthService) {
  }

  loadData() {
    this.dataService.getCinemaHalls().subscribe(
      next => {
        this.cinemaHalls = next;
        this.loadingData = false;
        this.processUrlParams();
      }, error => {
        if (error.status === 402) {
          this.message = 'Sorry - you need to pay to use this application.';
        } else {
          this.loadingAttempts++;
          if (this.loadingAttempts <= 10) {
            this.message = 'Sorry - something went wrong, trying again.... please wait ';
            this.loadData();
          } else {
            this.message = 'Sorry - something went wrong, please contact support.';
          }
        }
      }
    );
  }

  processUrlParams() {
    this.route.queryParams.subscribe(
      (params) => {
        this.action = null;
        const id = params['id'];
        if (id) {
          this.selectedCinemaHall = this.cinemaHalls.find(cinemaHall => cinemaHall.id === +id);
          this.action = params['action'];
        }
        if (params['action'] === 'add') {
          this.selectedCinemaHall = new CinemaHall();
          this.action = 'edit';
          this.formResetService.cinemaHallEventEmitter.emit(this.selectedCinemaHall);
        }
      }
    );
  }

  ngOnInit() {
    this.loadData();
    if (this.authService.role === 'ADMIN') {
      this.isAdminUser = true;
    }
    this.authService.roleSetEvent.subscribe(
      next => {
        if (next === 'ADMIN') {
          this.isAdminUser = true;
        } else {
          this.isAdminUser = false;
        }
      }
    );
  }


  setCinemaHall(id: number) {
    this.router.navigate(['admin', 'cinemaHalls'], {queryParams: {id, action: 'view'}});
  }

  addCinemaHall() {
    this.router.navigate(['admin', 'cinemaHalls'], {queryParams: {action: 'add'}});
  }

}
