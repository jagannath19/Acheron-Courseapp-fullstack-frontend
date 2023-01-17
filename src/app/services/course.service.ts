import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private _getUrl = environment.getUrl;
  private _crudUrl = environment.crudUrl;

  constructor(private _httpClient: HttpClient) {}

  getAll = (pages: number, records: number): Observable<Course[]> => {
    return this._httpClient.get<Course[]>(
      `${this._getUrl}/courses/pages/${pages}/records/${records}`
    );
  };


  getBySearch=(data:string):Observable<Course[]>=>{
    return this._httpClient.get<Course[]>(
      `${this._getUrl}/search/${data}`
      );
    };
    
    totalRecords=():Observable<number> =>{
      return this._httpClient.get<number>(`${this._getUrl}/length`);
    }
    
  getById = (id: string): Observable<any> => {
    return this._httpClient.get(`${this._getUrl}/course/${id}`);
  };


  addCourse = (course: Course): Observable<string> => {
    return this._httpClient.post<string>(`${this._crudUrl}/addCourse`, course, {
      responseType: 'text' as 'json',
    });
  };

  deleteCourse = (courseId: string): Observable<any> => {
    return this._httpClient.delete(`${this._crudUrl}/deleteCourse/${courseId}`);
  };

  updateCourse = (course: Course): Observable<string> => {
    return this._httpClient.put<string>(`${this._crudUrl}/updateCourse`, course, {
      responseType: 'text' as 'json',
    });
  };

}
