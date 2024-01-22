import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDropFileComponent } from './file-drop-file.component';

describe('FileDropFileComponent', () => {
  let component: FileDropFileComponent;
  let fixture: ComponentFixture<FileDropFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileDropFileComponent]
    });
    fixture = TestBed.createComponent(FileDropFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
