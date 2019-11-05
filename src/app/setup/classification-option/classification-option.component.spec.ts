import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationOptionComponent } from './classification-option.component';

describe('ClassificationOptionComponent', () => {
  let component: ClassificationOptionComponent;
  let fixture: ComponentFixture<ClassificationOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
