import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public form: FormGroup;
  public selectedAssistant: string;

  public hours: any[];
  public minutes: any[];
  public schedule: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.hours = [];
    this.minutes = [];
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      scheduleDate: [null, [Validators.required]],
      scheduleHour: [null, [Validators.required]],
      scheduleMinute: [null, [Validators.required]],
      scheduleAPM: [null, [Validators.required]],
    });

    for (let index = 1; index < 13; index++) {
      this.hours.push(index);
    }
    for (let index = 0; index < 60; index++) {
      this.minutes.push(index);
    }

    this.schedule = this.cartService.getSchedule();
    if (this.schedule) {
      this.form.patchValue({
        scheduleDate: this.schedule.date,
        scheduleHour: this.schedule.hour,
        scheduleMinute: this.schedule.minute,
        scheduleAPM: this.schedule.apm
      });
    }


    this.selectedAssistant = this.cartService.getAssistant();

  }

  onSchedule() {
    const schedule = {
      date: this.form.value.scheduleDate,
      hour: this.form.value.scheduleHour,
      minute: this.form.value.scheduleMinute,
      apm: this.form.value.scheduleAPM,
    };

    this.cartService.setSchedule(schedule);
      // this.notificationService.success(':: Added successfully');
    this.router.navigate(['../step-three'], {relativeTo: this.activatedRoute});

  }


}
