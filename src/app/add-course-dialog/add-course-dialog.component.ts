import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent implements OnInit {
  addForm: FormGroup;
  constructor(private fb: FormBuilder,
  private dialogRef: MatDialogRef<AddCourseDialogComponent>) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      course_id: [''],
      name: ['', Validators.required],
      start_date:['', Validators.required],
      end_date:['', Validators.required]
    })
  }
  
  onAddCourse(){
    this.dialogRef.close(this.addForm);
    console.log(this.addForm)
  }
}