import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CinemaHall} from '../../../model/CinemaHall';
import {Router} from '@angular/router';
import {DataService} from '../../../data.service';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-cinema-hall-detail',
  templateUrl: './cinema-hall-detail.component.html',
  styleUrls: ['./cinema-hall-detail.component.css']
})
export class CinemaHallDetailComponent implements OnInit {

  @Input()
  cinemaHall: CinemaHall;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';
  isAdminUser = false;

  constructor(private router: Router,
              private dataService: DataService,
              private authService: AuthService) {
  }

  ngOnInit() {
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

  editCinemaHall() {
    this.router.navigate(['admin', 'cinemaHalls'], {queryParams: {action: 'edit', id: this.cinemaHall.id}});
  }

  deleteCinemaHall() {
    const result = confirm('Are you sure you wish to delete this hall?');
    if (result) {
      this.message = 'Deleting...';
      this.dataService.deleteCinemaHall(this.cinemaHall.id).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'cinema-halls']);
        }, error => {
          this.message = 'Sorry - this hall cannot be deleted at this time.';
        }
      );
    }
  }

}
