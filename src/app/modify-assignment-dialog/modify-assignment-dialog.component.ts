import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentItem } from '../templates/template';


@Component({
  selector: 'app-modify-assignment-dialog',
  templateUrl: './modify-assignment-dialog.component.html',
  styleUrls: ['./modify-assignment-dialog.component.css']
})

export class ModifyAssignmentDialogComponent implements OnInit {
  name: string;
  modifyForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AssignmentItem, private fb: FormBuilder,
              private dialogRef: MatDialogRef<ModifyAssignmentDialogComponent>) {
  }

  ngOnInit() {
    this.name = this.data.name;
    this.modifyForm = this.fb.group({
      assignment_id: [this.data.assignment_id],
      description: [this.data.description, Validators.required],
      state: [this.data.state, Validators.required],
      create_date: [this.data.create_date, Validators.required],
      due_date: [this.data.due_date, Validators.required]
    });
  }

  onSaveSubmit() {
    this.dialogRef.close(this.modifyForm);
  }
}
