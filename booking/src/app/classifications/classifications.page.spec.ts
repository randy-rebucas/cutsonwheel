import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassificationsPage } from './classifications.page';

describe('ClassificationsPage', () => {
  let component: ClassificationsPage;
  let fixture: ComponentFixture<ClassificationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
