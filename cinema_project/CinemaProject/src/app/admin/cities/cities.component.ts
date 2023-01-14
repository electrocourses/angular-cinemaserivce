import {Component, OnInit} from '@angular/core';
import {City} from '../../model/City';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../data.service';
import {CinemaHall} from '../../model/CinemaHall';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities: Array<City>;
  cinemaHalls: Array<CinemaHall>;
  isAdminUser = false;
  loadingData = true;
  loadingAttempts = 0;
  message = 'Please wait...Data is loading...';
  action: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getAllCities().subscribe(
      next => {
        this.cities = next;
        this.loadingData = false;
        console.log('From cities component onInit: ', next);
      }, error => {
        if (error.status === 402) {
          this.message = 'Sorry - you need to pay to use this application.';
        } else {
          this.loadingAttempts++;
          if (this.loadingAttempts <= 10) {
            this.message = 'Sorry - something went wrong, trying again.... please wait.';
            this.loadData();
          } else {
            this.message = 'Sorry - something went wrong, please contact support.';
          }
        }
      }
    );
  }

  selectCinemaHall(id: number) {
    this.router.navigate(['admin', 'cinemaHalls'], {queryParams: {id, action: 'view'}});
  }

  addCity() {

  }
}
