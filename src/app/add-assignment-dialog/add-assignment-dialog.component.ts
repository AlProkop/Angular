import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-assignment-dialog',
  templateUrl: './add-assignment-dialog.component.html',
  styleUrls: ['./add-assignment-dialog.component.css']
})
export class AddAssignmentDialogComponent implements OnInit {

  addForm: FormGroup;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data,
  private dialogRef: MatDialogRef<AddAssignmentDialogComponent>) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      state: ['', Validators.required],
      create_date:['', Validators.required],
      due_date:['', Validators.required],
      course_id_FK:[this.data.course_id_FK]
    })
  }
  
  onAddAssignment(){
    this.dialogRef.close(this.addForm);
    console.log(this.addForm)
  }
}