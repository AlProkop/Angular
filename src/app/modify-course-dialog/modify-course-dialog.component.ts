import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modify-course-dialog',
  templateUrl: './modify-course-dialog.component.html',
  styleUrls: ['./modify-course-dialog.component.css']
})
export class ModifyCourseDialogComponent implements OnInit {
  modifyForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder,
  private dialogRef: MatDialogRef<ModifyCourseDialogComponent>) { 
  }

  ngOnInit() {  
    this.modifyForm = this.fb.group({
      name: [this.data.name, Validators.required],
      start_date:[this.data.start_date, Validators.required],
      end_date:[this.data.end_date, Validators.required]
    })
  }
  onSaveSubmit() {
    this.dialogRef.close(this.modifyForm);
  }
}
