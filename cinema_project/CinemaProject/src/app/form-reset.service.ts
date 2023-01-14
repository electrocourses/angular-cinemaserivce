import {EventEmitter, Injectable} from '@angular/core';
import {CinemaHall} from './model/CinemaHall';
import {User} from './model/User';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  cinemaHallEventEmitter = new EventEmitter<CinemaHall>();
  userEventEmitter = new EventEmitter<User>();

  constructor() {
  }
}
