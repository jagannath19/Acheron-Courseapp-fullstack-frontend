import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  id: any = '';
  constructor(
    private formBuilder: FormBuilder,
    private _courseService: CourseService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  addForm = new FormGroup({
    courseName: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    subcategory: new FormControl(''),
    topics: new FormControl(),
    facultyName: new FormControl('', [Validators.required]),
    durationInDays: new FormControl('', [Validators.required]),
    totalHour: new FormControl(''),
    status: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl(''),
    languages: new FormControl('', [Validators.required]),
    subtitles: new FormControl(''),
    features: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required, Validators.max(5)]),
    level: new FormControl(''),
    mode: new FormControl('', [Validators.required]),
    objectID: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  readonly: boolean = false;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: (data) => {
        this.id = data['courseID'];
      },
    });
    if (this.id) {
      this._courseService.getById(this.id).subscribe({
        next: (data) => {
          this.addForm.setValue(data);
          this.readonly=true;
          console.log('read',this.readonly);
        },
        error: () => console.log('error in update'),
      });
    }
    else{
      this.readonly=false;
      console.log('read',this.readonly);
      
    }
  }

  onSubmit(form: any) {
    if (this._router.url.includes('update')) {
      const newCourse = {
        ...form.value,
      };
      this._courseService.updateCourse(newCourse).subscribe({
        next: (course) => {},
        complete: () => {
          alert('Course updated Successfuly');
          this._router.navigateByUrl('course-list');
        },
      });
    } else {
      const newCourse = {
        ...form.value,
        topics: [form.value.topics],
        features: [form.value.features],
      };
      this._courseService.addCourse(newCourse).subscribe({
        next: (course) => {},
        complete: () => {
          alert('Course added Successfuly');
          this._router.navigateByUrl('course-list');
        },
      });
    }
  }
}
