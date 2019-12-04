import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule, MatIconModule, MatCardModule, MatDialogModule, 
  MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, 
  MatDialogRef, MAT_DIALOG_DATA, MatExpansionModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CourseComponent } from './course/course.component';
import { HeaderComponent } from './header/header.component';
import { BoldDirective } from './bold.directive';
import { CourseCardComponent } from './course-card/course-card.component';
import { AddCourseDialogComponent } from './add-course-dialog/add-course-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifyAssignmentDialogComponent } from './modify-assignment-dialog/modify-assignment-dialog.component';
import { AddAssignmentDialogComponent } from './add-assignment-dialog/add-assignment-dialog.component';
import { ModifyCourseDialogComponent } from './modify-course-dialog/modify-course-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    PageNotFoundComponent,
    CourseComponent, 
    HeaderComponent,
    BoldDirective,
    CourseCardComponent,
    AddCourseDialogComponent,
    ModifyAssignmentDialogComponent,
    AddAssignmentDialogComponent,
    ModifyCourseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule, 
    ReactiveFormsModule
  ],
  entryComponents: [
    AddCourseDialogComponent,ModifyCourseDialogComponent, ModifyAssignmentDialogComponent, AddAssignmentDialogComponent
  ],
  providers: [DatePipe,
              {provide: MatDialogRef, useValue: {} },
              {provide: MAT_DIALOG_DATA, useValue: [] },
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
