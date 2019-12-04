import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    data: {title: 'Courses'}
  },
  {
    path: 'course/:id',
    component: CourseComponent,
    data: {title: 'Course'}
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
