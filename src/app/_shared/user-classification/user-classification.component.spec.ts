import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClassificationComponent } from './user-classification.component';

describe('UserClassificationComponent', () => {
  let component: UserClassificationComponent;
  let fixture: ComponentFixture<UserClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
