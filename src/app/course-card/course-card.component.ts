import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseItem } from '../templates/template';
import { ModifyCourseDialogComponent } from '../modify-course-dialog/modify-course-dialog.component';
import { DataService } from '../services/data.service';
import { RequestsService } from '../services/requests.service';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course: CourseItem;
  
  constructor(protected dataService:DataService,protected requestService:RequestsService,
    public dialog: MatDialog, protected router: Router) { }

  ngOnInit() {}

  onModify(){
    const dialogRef = this.dialog.open(ModifyCourseDialogComponent, { 
        width: '500px',
        data: this.course
    });
    dialogRef.afterClosed().subscribe(dataForm => {
      if(dataForm!=null){
        dataForm.value.start_date = this.dataService.getDate(dataForm.value.start_date);
        dataForm.value.end_date = this.dataService.getDate(dataForm.value.end_date);
        
        console.log(dataForm);
        this.requestService.updateItem(dataForm.value, `updateCourse/${this.course.course_id}`)
          .subscribe(
            data=>{
              this.course = data;
              this.dataService.updateArrayCourses(data);
            },
            error => console.log('oops', error)
          );
      }
    });
  }

  onSelect(){
    this.router.navigate(['/course/' + this.course.course_id]);
  }
}
