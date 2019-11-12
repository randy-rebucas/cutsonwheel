import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'cowls-steps-one',
  templateUrl: './steps-one.component.html',
  styleUrls: ['./steps-one.component.css']
})
export class StepsOneComponent implements OnInit, OnDestroy {

  public classificationId: string;
  public selectedAssistant: string;
  private assistantSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
  ) { }

  ngOnInit() {

    this.activatedRoute.parent.params.subscribe(
      (param) => {
        this.classificationId = param.classificationId;
      }
    );

    this.selectedAssistant = this.cartService.getAssistant();
    this.assistantSub = this.cartService.getAssistantObservable().subscribe(
      (assistant) => {
        this.selectedAssistant = assistant.assistant;
      }
    );
  }

  onNext(steps: string) {
    this.router.navigate(['../' + steps], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy() {
    this.assistantSub.unsubscribe();
  }
}
