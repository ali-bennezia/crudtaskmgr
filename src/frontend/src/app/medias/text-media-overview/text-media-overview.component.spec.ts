import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMediaOverviewComponent } from './text-media-overview.component';

describe('TextMediaOverviewComponent', () => {
  let component: TextMediaOverviewComponent;
  let fixture: ComponentFixture<TextMediaOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextMediaOverviewComponent]
    });
    fixture = TestBed.createComponent(TextMediaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
