import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;
  id: any;
  loading: boolean = true;
  roles: string[] | undefined;
  role: string = '';
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _courseService: CourseService,
    private _router: Router,
    private keycloakService: KeycloakService
  ) {}
  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: (data) => {
        this.id = data;
        const objectID = this.id.objectID;
        this._courseService.getById(objectID).subscribe({
          next: (data: any) => {
            this.course = data;
            this.loading = false;
          },
        });
      },
    });

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

  deleteRow(courseId: any) {
    this._courseService.deleteCourse(courseId).subscribe({
      error: () => {
        'Error in deleting may be id not found';
      },
      complete: () => {
        alert('Courese Deleted');
        this._router.navigate(['course-list']);
      },
    });
  }
  edit = (objectID: string) => {
    this._router.navigate(['/update-course', objectID]);
  };
}
