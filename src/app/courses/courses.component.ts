import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service'
import { CourseItem } from '../templates/template';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: CourseItem[]=[];
  appTitle: string;
  constructor(protected dataService: DataService, protected requestService: RequestsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.appTitle = "Course Tracker 2019";   
    if(!this.dataService.isDataFromDB()){
      this.dataService.getAllAssignmentsFromDB();
      this.dataService.getCoursesFromDB().subscribe(data => this.courses=data);
    }
    else
    this.courses = this.dataService.getCourses()
   }
  
  onAddNew(){
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {width:'500px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        result.value.start_date = this.dataService.getDate(result.value.start_date);
        result.value.end_date = this.dataService.getDate(result.value.end_date);        
        this.requestService.addItem(result.value, "addCourse")
        .subscribe(
            data=>this.courses.push(data),
            error => console.log('oops ', error)
          );
      }
    });
  } 
}
