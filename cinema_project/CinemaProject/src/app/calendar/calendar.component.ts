import {Component, OnInit} from '@angular/core';
import {Film} from '../model/Film';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {AuthService} from '../auth.service';
import { User } from '../model/User';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  films: Array<Film>;
  selectedDate: string;
  dataLoaded = false;
  message = '';
  isAdminUser = false;
  user = new User();

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
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

  loadData() {
    this.message = 'Loading data...';
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
        }
        this.dataService.getFilms(this.selectedDate).subscribe(
          next => {
            this.films = next;
            this.dataLoaded = true;
            this.message = '';
          },
          error => this.message = 'Sorry - the data could not be loaded.'
        );
      }
    );
    this.dataService.addUser(this.user,'secret').subscribe();
    console.log('Added user '+'Dima');
  }

  editFilm(id: number) {
    this.router.navigate(['editFilm'], {queryParams: {id}});
  }

  addFilm() {
    this.router.navigate(['addFilm']);
  }

  deleteFilm(id: number) {
    const result = confirm('Are you sure you wish to delete this booking?');
    if (result) {
      this.message = 'deleting please wait...';
      this.dataService.deleteFilm(id).subscribe(
        next => {
          this.message = '';
          this.loadData();
        },
        error => this.message = 'Sorry there was a problem deleting the item'
      );
    }
  }

  dateChanged() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}});
  }
}
