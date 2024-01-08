import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyTasksComponent } from './page-my-tasks.component';

describe('PageMyTasksComponent', () => {
  let component: PageMyTasksComponent;
  let fixture: ComponentFixture<PageMyTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageMyTasksComponent]
    });
    fixture = TestBed.createComponent(PageMyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
