import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskGroupComponent } from './create-task-group.component';

describe('CreateTaskGroupComponent', () => {
  let component: CreateTaskGroupComponent;
  let fixture: ComponentFixture<CreateTaskGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskGroupComponent]
    });
    fixture = TestBed.createComponent(CreateTaskGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
