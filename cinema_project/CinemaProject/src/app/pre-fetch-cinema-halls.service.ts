import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CinemaHall} from './model/CinemaHall';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PreFetchCinemaHallsService implements Resolve<Observable<Array<CinemaHall>>> {

  constructor(private dataService: DataService) {
  }

  resolve() {
    return this.dataService.getCinemaHalls();
  }
}
