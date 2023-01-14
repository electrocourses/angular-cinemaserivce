import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CinemaHall, Layout, LayoutCapacity} from '../../../model/CinemaHall';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../data.service';
import {FormResetService} from '../../../form-reset.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-cinema-halls-edit',
  templateUrl: './cinema-halls-edit.component.html',
  styleUrls: ['./cinema-halls-edit.component.css']
})
export class CinemaHallsEditComponent implements OnInit, OnDestroy {

  @Input()
  cinemaHall: CinemaHall;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  resetEventSubscription: Subscription;

  cinemaHallForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private formResetService: FormResetService) {
  }

  ngOnInit() {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.cinemaHallEventEmitter.subscribe(
      next => {
        this.cinemaHall = next;
        this.initializeForm();
      }
    );
  }

  ngOnDestroy() {
    this.resetEventSubscription.unsubscribe();
  }

  initializeForm() {
    console.log('On init method');
    this.cinemaHallForm = this.formBuilder.group(
      {
        name: [this.cinemaHall.name, Validators.required],
        location: [this.cinemaHall.location, [Validators.required, Validators.minLength(2)]]
      }
    );

    for (const layout of this.layouts) {
      const layoutCapacity = this.cinemaHall.capacities.find(lc => lc.layout === Layout[layout]);
      const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
      this.cinemaHallForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
    }
  }

  onSubmit() {
    this.cinemaHall.name = this.cinemaHallForm.controls['name'].value;
    this.cinemaHall.location = this.cinemaHallForm.value['location'];
    this.cinemaHall.capacities = new Array<LayoutCapacity>();

    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.cinemaHallForm.controls[`layout${layout}`].value;
      this.cinemaHall.capacities.push(layoutCapacity);
    }

    if (this.cinemaHall.id == null) {
      this.dataService.addCinemaHall(this.cinemaHall).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'cinemaHalls'], {queryParams: {action: 'view', id: next.id}});
        }, error => {
          this.message = 'Something went wrong, you may wish to try again.';
        }
      )
      ;
    } else {
      this.dataService.updateCinemaHall(this.cinemaHall).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'cinemaHalls'], {queryParams: {action: 'view', id: next.id}});
        }, error => {
          this.message = 'Something went wrong, you may wish to try again.';
        }
      );
    }
  }

}
