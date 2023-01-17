import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseGridComponent } from './components/course-grid/course-grid.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['MANAGER', 'EDITOR', 'MEMBER'] },
  },
  {
    path: 'course-details/:objectID',
    component: CourseDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['MANAGER', 'EDITOR', 'MEMBER'] },
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    canActivate: [AuthGuard],
    data: { roles: ['MANAGER'] },
  },
  {
    path: 'course-list',
    component: CourseListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['MANAGER', 'EDITOR', 'MEMBER'] },
  },
  {
    path: 'course-grid',
    component: CourseGridComponent,
    canActivate: [AuthGuard],
    data: { roles: ['MANAGER', 'EDITOR', 'MEMBER'] },
  },
  {
    path: 'update-course/:courseID',
    component: AddCourseComponent,
    canActivate: [AuthGuard],
    data: { roles: ['MANAGER', 'EDITOR'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
