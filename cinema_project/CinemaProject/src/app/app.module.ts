import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {CalendarComponent} from './calendar/calendar.component';
import {UsersComponent} from './admin/users/users.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CinemaHallsComponent} from './admin/cinema-halls/cinema-halls.component';
import {CinemaHallDetailComponent} from './admin/cinema-halls/cinema-hall-detail/cinema-hall-detail.component';
import {UserDetailComponent} from './admin/users/user-detail/user-detail.component';
import {EditUserComponent} from './admin/users/edit-user/edit-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CinemaHallsEditComponent} from './admin/cinema-halls/cinema-halls-edit/cinema-halls-edit.component';
import {EditFilmComponent} from './calendar/edit-film/edit-film.component';
import {HttpClientModule} from '@angular/common/http';
import {PreFetchCinemaHallsService} from './pre-fetch-cinema-halls.service';
import {PreFetchUsersService} from './pre-fetch-users.service';
import {LoginComponent} from './login/login.component';
import {AuthRouteGuardService} from './auth-route-guard.service';
import { CitiesComponent } from './admin/cities/cities.component';


const routes: Routes = [
  {path: 'admin/cities', component: CitiesComponent,  canActivate: [AuthRouteGuardService]},
  {path: 'admin/users', component: UsersComponent, canActivate: [AuthRouteGuardService]},
  {path: 'admin/cinemaHalls', component: CinemaHallsComponent, canActivate: [AuthRouteGuardService]},
  {
    path: 'editFilm',
    component: EditFilmComponent,
    resolve: {cinemaHalls: PreFetchCinemaHallsService, users: PreFetchUsersService},
    canActivate: [AuthRouteGuardService]
  },
  {
    path: 'addFilm',
    component: EditFilmComponent,
    resolve: {cinemaHalls: PreFetchCinemaHallsService, users: PreFetchUsersService},
    canActivate: [AuthRouteGuardService]
  },
  {path: '', component: CalendarComponent},
  {path: 'login', component: LoginComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    CinemaHallsComponent,
    UsersComponent,
    PageNotFoundComponent,
    CinemaHallDetailComponent,
    UserDetailComponent,
    EditUserComponent,
    CinemaHallsEditComponent,
    EditFilmComponent,
    LoginComponent,
    CitiesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
