import { Component, OnInit } from '@angular/core';
import { CourseItem, AssignmentItem } from '../templates/template';
import {DataService} from '../services/data.service';
import {ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModifyAssignmentDialogComponent } from '../modify-assignment-dialog/modify-assignment-dialog.component';
import { AddAssignmentDialogComponent } from '../add-assignment-dialog/add-assignment-dialog.component';
import { RequestsService } from '../services/requests.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseId: number;
  courseName: string;  // is used as a title on the header 
  assignments: AssignmentItem[]=[];
  assignment: AssignmentItem; // object which will be modify

  constructor(protected dataService: DataService, protected route: ActivatedRoute,
    public dialog: MatDialog, protected requestService: RequestsService) { 
    this.courseId = Number(route.snapshot.paramMap.get('id'));
    }

  ngOnInit() {
    if(!this.dataService.isDataFromDB()){ //if there are no data stored in the data.service
      this.dataService.getCourseAssignmentsFromDB(this.courseId)
        .subscribe(data=>this.assignments = data);
      this.dataService.getCourseNameFromDB(this.courseId)
        .subscribe(data => this.courseName=data[0].name);    
      }
    else{
      this.courseName = this.dataService.getCourseName(this.courseId);
      this.assignments = this.dataService.getCourseAssignments(this.courseId);
    }
  }

  onAddNew(){
    const dialogRef = this.dialog.open(AddAssignmentDialogComponent, {
      width:'700px',
      data:{course_id_FK:this.courseId}});
    dialogRef.afterClosed().subscribe(dataForm => {
      if(dataForm!=null){
        dataForm = this.onPrepareData(dataForm);
        this.requestService.addItem(dataForm, "addAssignment")
          .subscribe(
            data => this.assignments.push(data),
            error => console.log('oops', error)
          );
      }
    });
  }
  
  onModify(assignId: number){
    this.assignment = this.onFindAssignment(assignId);
    const dialogRef = this.dialog.open(ModifyAssignmentDialogComponent, { 
        data: this.assignment, width:'550px'
    });
    dialogRef.afterClosed().subscribe(dataForm => {
      if(dataForm!=null){
        dataForm = this.onPrepareData(dataForm);
        this.requestService.updateItem(dataForm, `updateAssignment/${assignId}`)
          .subscribe(
            data=>{
              let index = this.onFindArrIndex(data);
              this.assignments[index] = data;
              this.dataService.updateArrayAssignments(data);
            },
            error => console.log('oops', error)
          );
      }
    });
  }
  onDelete(assignId: number){
    this.requestService.deleteItem(`deleteAssignment/${assignId}`)
      .subscribe(
        data=>{
          console.log("assignment was deleted: " + data);
          this.assignments = this.assignments.filter(obj => obj.assignment_id != assignId);
        }, 
        error => console.log('oops', error));
  }
  
  onPrepareData(result): AssignmentItem{
    result.value.course_id_FK = this.courseId;
    result.value.create_date = this.dataService.getDate(result.value.create_date);
    result.value.due_date = this.dataService.getDate(result.value.due_date);
    return result.value;
  }
  
  onFindArrIndex(assignment: AssignmentItem):number{
    return this.assignments.findIndex(elem=>elem.assignment_id==assignment.assignment_id);  
  }

  onFindAssignment(assignmentId:number): AssignmentItem{
    return this.assignments.filter(elem=>elem.assignment_id === assignmentId).pop();
  }
}

