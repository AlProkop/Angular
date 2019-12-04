import { Injectable } from '@angular/core';
import { RequestsService} from './requests.service';
import { HttpClient } from '@angular/common/http';

import{CourseItem, AssignmentItem} from '../templates/template'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

   courses: CourseItem[];
   assignments: AssignmentItem[];
   gotAssignments: boolean = false;
   gotCourses: boolean = false;
   
  constructor(protected httpClient: HttpClient, protected requestService: RequestsService, protected router: Router,
    private datePipe : DatePipe) {}

  onGoHome(){
    this.router.navigate(['']);
  }
  
  //getting data from database
  //function operates once when ngOnInit() initializes the component Courses
  getCoursesFromDB(): Observable<CourseItem[]>{
    this.gotCourses = true;
     return this.requestService.getItem("getCourses")
     .pipe(map(data => this.courses = data));  //storing data in "cache"   
  }
  
  getAllAssignmentsFromDB(){
    this.requestService.getItem("getAssignments")
      .subscribe(data => this.assignments = data);
    this.gotAssignments = true;
  }

  // in case if client desided to refresh a page with assignment or to write down 
  // something like "/course/1" in address bar
  getCourseAssignmentsFromDB(course_id: number): Observable<AssignmentItem[]>{
    return this.requestService.getItem("getAssignments")
      .pipe(map(items=>items.filter(item=>item.course_id_FK == course_id)))    
  }
  getCourseNameFromDB(course_id: number):Observable<CourseItem>{
    return this.requestService.getItem("getCourses")
    .pipe(map(items=>items.filter(item=>item.course_id==course_id)))
  }

  // a flag which informs that data from DB is already in cache  
  isDataFromDB():boolean{
    return this.gotAssignments&&this.gotCourses;
  }

  
  //getting data from "cache"
  getCourses(){
    return this.courses;
  }

  getCourseName(index: number): string{
    return this.courses
    .filter(item=>item.course_id == index).pop().name;
  }

  getCourseAssignments(course_id: number): AssignmentItem[]{
    return this.assignments.filter(item=>item.course_id_FK == course_id);
 }


  getDate(date: any): any{
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  updateArrayCourses(item){
    let index = this.courses.findIndex(elem=>elem.course_id == item.course_id);
    this.courses[index]=item;
  }
  updateArrayAssignments(item){
    let index = this.courses.findIndex(elem=>elem.course_id == item.course_id);
    this.courses[index]=item;
  }
}