import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Payments } from './payments';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private payments: Observable<Payments[]>;
  private paymentsCollection: AngularFirestoreCollection<Payments>;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.paymentsCollection = this.afs.collection<Payments>('payments');
  }

  getPaymentsData(collection: AngularFirestoreCollection): Observable<any> {
    return collection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getPaymentsByAssistantId(assistantId: string) {
    const collection$ = this.afs.collection<Payments>('payments', ref => ref
      .orderBy('datePaid', 'asc')
      .where('bookings.assistant.assisstantId', '==', assistantId)
    );
    return this.getPaymentsData(collection$);
  }

  getPayments(): Observable<Payments[]> {
    const collection$ = this.afs.collection<Payments>('payments', ref => ref.orderBy('datePaid', 'asc'));
    return this.getPaymentsData(collection$);
  }

  getPaymentsDetail(id: string): Observable<Payments> {
    return this.paymentsCollection.doc<Payments>(id).valueChanges().pipe(
      take(1),
      map(payments => {
        payments.id = id;
        return payments;
      })
    );
  }

  insertPayment(payment: any): Promise<DocumentReference> {
    return this.paymentsCollection.add(payment);
  }

  updatePayment(payment: any): Promise<void> {
    return this.paymentsCollection.doc(payment.id).update({
      title: payment.title,
      description: payment.description,
      type: payment.type,
      url: payment.url,
      published: payment.published
    });
  }

  deletePayment(id: string): Promise<void> {
    return this.paymentsCollection.doc(id).delete();
  }
}
