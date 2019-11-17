import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BookNowService } from '../../book-now/book-now.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentOption: string;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private booknowService: BookNowService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      paymentOption: ['', [Validators.required]]
    });
  }

  onSubmit() {

    const newBooking = {
      paymentOption: this.form.value.paymentOption
    };

    this.booknowService.insert(newBooking).subscribe((response) => {
      this.notificationService.success(response.message);
      // this.router.navigate(['../classifications'], {relativeTo: this.activatedRoute});
    });
  }
}
