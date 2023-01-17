import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { KeycloakService } from 'keycloak-angular';
import { map } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css'],
})
export class CourseGridComponent implements OnInit {
  courses: Course[] = [];

  roles: string[] | undefined;
  role: string = '';
  page: any;
  records: any;
  length: number = 0;
  constructor(
    private _courseService: CourseService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.page = 0;
    this.records = 4;
    this.getAllCourses(this.page, this.records);
    this.totalRecords();

    this.roles =
      this.keycloakService.getKeycloakInstance().realmAccess?.['roles'];
    if (this.roles?.indexOf('MANAGER') != -1) {
      this.role = 'MANAGER';
    } else if (this.roles?.indexOf('EDITOR') != -1) {
      this.role = 'EDITOR';
    } else {
      this.role = 'MEMBER';
    }
  }
  onPageChange(pageChangeEvent: any) {
    this.records = pageChangeEvent.pageSize;
    this.page = pageChangeEvent.pageIndex;

    this.getAllCourses(this.page, this.records);
  }

  getAllCourses = (pages: number, records: number) => {
    this._courseService.getAll(pages, records).subscribe({
      next: (course) => {
        this.courses = course;
      },
      error: (course) => console.log('error'),
      complete: () => console.log('Getting all Courses'),
    });
  };

  totalRecords() {
    this._courseService.totalRecords().subscribe({
      next: (data) => (this.length = data),
    });
  }
}
