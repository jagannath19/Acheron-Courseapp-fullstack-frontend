import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, from, map } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { CourseDetailsComponent } from '../course-details/course-details.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  columns = new FormControl('');
  dataSource = new MatTableDataSource<Course>(this.courses);
  userRoles: any;
  updatecourse!: Course;
  columns1: any[] = [];
  page: any = 0;
  records: any = 5;
  grid: boolean = false;
  length: number = 0;
  list: any;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'courseName',
    'category',
    'subcategory',
    'topics',
    'facultyName',
    'durationInDays',
    'totalHour',
    'status',
    'startDate',
    'endDate',
    'languages',
    'subtitles',
    'features',
    'price',
    'rating',
    'level',
    'mode',
    'objectID',
    'edit',
    'delete',
  ];
  emptyColumn: string[] = this.displayedColumns;
  constructor(
    private _courseService: CourseService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.columns1 = this.displayedColumns;
    this.page = 0;
    this.records = 3;
    this.getAllCourses(this.page, this.records);
    this.getRoll();
    this.totalRecords();
  }

  onItemSelect(event: any) {
    this.displayedColumns = event.value;
    if (event.value == '') {
      this.displayedColumns = this.emptyColumn;
    }
  }

  getRoll() {
    this.userRoles = this._authService.getRole();
  }
  onPageChange(pageChangeEvent: any) {
    this.records = pageChangeEvent.pageSize;
    this.page = pageChangeEvent.pageIndex;

    this.getAllCourses(this.page, this.records);
  }

  getAllCourses = (pages: number, records: number) => {
    this._courseService.getAll(pages, records).subscribe({
      next: (course: any) => {
        this.dataSource = course;
      },
      error: (error) => console.log('error', error),
      complete: () => console.log('Getting courses', this.length),
    });
  };

  totalRecords() {
    this._courseService.totalRecords().subscribe({
      next: (data) => (this.length = data),
    });
  }

  delete(courseId: any) {
    this._courseService.deleteCourse(courseId).subscribe({
      error: () => {
        'Error in deleting may be id not found';
      },
      complete: () => {
        this.getAllCourses(this.page, this.records);
      },
    });
  }

  edit = (objectID: string) => {
    this._router.navigate(['/update-course', objectID]);
  };

  detail(objectID: string) {
    this._router.navigate(['/course-details', objectID]);
  }

  gidChange() {
    this.grid = !this.grid;
  }

  onSearchChange = (event: string) => {
    this._courseService.getBySearch(event).subscribe({
      next: (course: any) => {
        this.dataSource = course;
      },
    });
  };

  announceSortChange(event: any) {
    console.log(event);
    this.dataSource.sort = null;
    this.dataSource.sort = this.sort;
    console.log('Sorted:', this.dataSource.sort);
  }
}
