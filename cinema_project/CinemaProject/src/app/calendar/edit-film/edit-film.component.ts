import {Component, OnInit} from '@angular/core';
import {Film} from '../../model/Film';
import {CinemaHall, Layout} from '../../model/CinemaHall';
import {DataService} from '../../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/User';
import {map} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {

  film: Film;
  cinemaHalls: Array<CinemaHall>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users: Array<User>;
  dataLoaded = false;
  message = 'Please wait...Data loading...';
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
  isDataValid = false;


  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.cinemaHalls = this.route.snapshot.data.cinemaHalls;
    this.users = this.route.snapshot.data.users;

    const id = this.route.snapshot.queryParams.id;
    if (id) {
      this.dataService.getFilm(+id).pipe(
        map(film => {
            film.cinemaHall = this.cinemaHalls.find(hall => hall.id === film.cinemaHall.id);
            film.user = this.users.find(user => user.id === film.user.id);
            return film;
          }
        )
      ).subscribe(
        next => {
          this.film = next;
          this.dataLoaded = true;
          this.message = '';
        }
      );
    } else {
      this.film = new Film();
      this.dataLoaded = true;
      this.message = '';
    }
  }

  onSubmit() {
    if (this.film.id != null) {
      this.dataService.saveFilm(this.film).subscribe(
        next => this.router.navigate(['']),
        error => this.message = 'something went wrong : the film wasn\'t saved.'
      );
    } else {
      this.dataService.addFilm(this.film).subscribe(
        next => this.router.navigate(['']),
        error => this.message = 'something went wrong : the film wasn\'t saved.'
      );
    }
  }

  checkIfDateIsValid() {
   console.log('Current date', this.currentDate);
   console.log('Selected date date', this.film.date);
    // TODO make date validation
  }
}
