import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _courseService: CourseService,
    private _location: Location
  ) {}

  userName: string | undefined = '';

  loggedIn: boolean = false;

  userProfile: KeycloakProfile = {};

  async ngOnInit(): Promise<void> {
    this.loggedIn = await this._authService.isLoggedIn();
    if (this.loggedIn) {
      this.userProfile = await this._authService.loadUserProfile();
      this.userName = this.userProfile.firstName;
    } else {
      this._authService.login();
    }
  }

  logout = () => {
    this._authService.logout();
  };

  courses: Course[] = [];
  getall = (pages: number, record: number): Course[] => {
    this._courseService.getAll(pages, record).subscribe({
      next: (data: any) => {
        this.courses = data.hits;
      },
    });
    return this.courses;
  };

  goBack() {
    this._location.back();
  }
}
