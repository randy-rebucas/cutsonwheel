import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationDetailComponent } from './classification-detail.component';

describe('ClassificationDetailComponent', () => {
  let component: ClassificationDetailComponent;
  let fixture: ComponentFixture<ClassificationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
