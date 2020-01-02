import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewBookingPage } from './new-booking.page';

describe('NewBookingPage', () => {
  let component: NewBookingPage;
  let fixture: ComponentFixture<NewBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
