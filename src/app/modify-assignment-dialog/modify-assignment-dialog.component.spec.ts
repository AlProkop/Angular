import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAssignmentDialogComponent } from './modify-assignment-dialog.component';

describe('ModifyAssignDialogComponent', () => {
  let component: ModifyAssignmentDialogComponent;
  let fixture: ComponentFixture<ModifyAssignmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyAssignmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
