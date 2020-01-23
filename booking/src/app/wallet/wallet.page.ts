import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { PaymentsService } from '../payments/payments.service';
import { AuthService } from '../auth/auth.service';
import { IonInfiniteScroll, ToastController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Payments } from '../payments/payments';
import { Observable } from 'rxjs';
import { WalletDetailComponent } from './wallet-detail/wallet-detail.component';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false}) infiniteScroll: IonInfiniteScroll;
  public payments$: Observable<Payments[]>;
  public user: firebase.User;
  balance: number;
  wallets = [];
  payments: Payments;
  isLoading: boolean;
  length = 0;
  lastVisible: number;
  constructor(
    private paymentsService: PaymentsService,
    private payPal: PayPal,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.authService.getUserState().subscribe((user) => {
      if (user) {
        this.user = user;

        this.getTotalWallet(user.uid);
        // this.loadTransactions();
        this.paymentsService.getByUserId(this.user.uid).subscribe((wallets) => {
          this.isLoading = false;
          // this is an options
          this.wallets = this.wallets.concat(wallets);
        });
      }
    });
  }

  onDeposit() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'AeGqI_BcI2FsmEYVBH0XL-zSsOkcj_Ncb_2Zzic48r_l8xysSoZEexVUIP13w3RE5jAKYtC0FxrsGFBf',
      PayPalEnvironmentSandbox: 'AfIFZALGkJdcXCWWuqnwD-Z1JtNBsf913-X5UilLBhkDijCi-t17tJjFkzS_JtM5112HLLuheKQ12Ho4'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        const payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((response) => {
          // Successfully paid
          console.log(response);
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  onViewDetail(id: string) {
    this.modalCtrl.create({
        component: WalletDetailComponent,
        componentProps: {
          paymentId: id
        }
      }).then(modalEl => {
      modalEl.present();
    });
  }

  getTotalWallet(userId: string) {
    this.paymentsService.getUserWallet(userId).subscribe((payments) => {
      let balance = 0;
      for (const payment of payments) {
        if (payment.paymentTo === this.user.uid) {
          balance += payment.transactions.amount.total;
        }
      }
      this.balance = balance;
    });
  }

  loadTransactions(event?) {
    this.paymentsService.getByUserId(this.user.uid).subscribe((wallets) => {
      this.isLoading = false;
      // this is an options
      if (this.length < this.wallets.length) {
        event.target.complete();
        this.wallets = this.wallets.concat(wallets);
      } else {
        console.log('complete');
        // event.target.complete();
        event.target.disabled = true;
      }
    });
  }

  // loadDatas(event) {
  //   setTimeout(() => {
  //     console.log('Done');
  //     event.target.complete();

  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     if (data.length === 1000) {
  //       event.target.disabled = true;
  //     }
  //   }, 500);
  // }

  loadMore(event) {
    setTimeout(() => {
      this.length++;
      this.loadTransactions(event);
      if (this.length < this.wallets.length) {
        this.toastCtrl.create({
          message: 'All transaction loaded!',
          duration: 2000
        }).then(toast => toast.present());
        event.target.disabled = true;
      }
    }, 500);
  }

  loadData(event) {
    this.paymentsService.getByUserIdByLastVisible(this.user.uid).subscribe((payments) => {
      if (this.wallets.length < payments.length) {
        console.log('Loading data...');
        event.target.complete();

        payments.forEach(element => {
          this.wallets.push(element);
        });

        console.log('Done');
      } else {
        console.log('No More Data');
        this.toastCtrl.create({
          message: 'All transaction loaded!',
          duration: 2000
        }).then(toast => toast.present());
        event.target.disabled = true;
      }

    });
  }
}
