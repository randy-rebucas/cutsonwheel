import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cowls-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  form: FormGroup;
  public selectedAssistant: string;

  hours = [];
  minutes = [];
  schedule: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // set form inputs
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
    this.form.patchValue({
      scheduleDate: this.schedule.date,
      scheduleHour: this.schedule.hour,
      scheduleMinute: this.schedule.minute,
      scheduleAPM: this.schedule.apm
    });

    this.selectedAssistant = this.cartService.getAssistant();
    // retrive all assistant schedule

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
      // this.usersService.getAll(this.userType, this.perPage, this.currentPage);
    this.router.navigate(['../step-three'], {relativeTo: this.activatedRoute});

  }
}
