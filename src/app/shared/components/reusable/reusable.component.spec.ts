import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableComponent } from './reusable.component';

describe('ReusableComponent', () => {
  let component: ReusableComponent;
  let fixture: ComponentFixture<ReusableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReusableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
