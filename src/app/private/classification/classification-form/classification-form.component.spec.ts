import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationFormComponent } from './classification-form.component';

describe('ClassificationFormComponent', () => {
  let component: ClassificationFormComponent;
  let fixture: ComponentFixture<ClassificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
