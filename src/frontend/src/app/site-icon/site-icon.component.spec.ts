import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteIconComponent } from './site-icon.component';

describe('SiteIconComponent', () => {
  let component: SiteIconComponent;
  let fixture: ComponentFixture<SiteIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteIconComponent]
    });
    fixture = TestBed.createComponent(SiteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
