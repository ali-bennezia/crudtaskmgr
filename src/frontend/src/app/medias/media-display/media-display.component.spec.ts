import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDisplayComponent } from './media-display.component';

describe('MediaDisplayComponent', () => {
  let component: MediaDisplayComponent;
  let fixture: ComponentFixture<MediaDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaDisplayComponent]
    });
    fixture = TestBed.createComponent(MediaDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
