import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private successAlertSource = new Subject<boolean>();
  private warningAlertSource = new Subject<boolean>();
  private successDelete = new Subject<boolean>();

  successAlert$ = this.successAlertSource.asObservable();
  warningAlert$ = this.warningAlertSource.asObservable();

  showSuccessAlert() {
    this.successAlertSource.next(true);
  }

  showWarningAlert() {
    this.warningAlertSource.next(true);
  }

  showSuccesFolderAlert() {
    this.successAlertSource.next(true);
  }

  showWarningFodlerAlert() {
    this.warningAlertSource.next(true);
  }

  showDeleted() {
    this.successDelete.next(true);
  }

}