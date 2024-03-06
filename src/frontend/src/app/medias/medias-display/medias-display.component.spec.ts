import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasDisplayComponent } from './medias-display.component';

describe('MediasDisplayComponent', () => {
  let component: MediasDisplayComponent;
  let fixture: ComponentFixture<MediasDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediasDisplayComponent]
    });
    fixture = TestBed.createComponent(MediasDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
