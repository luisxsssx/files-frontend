import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  successVisible: boolean = false;
  warningVisible: boolean = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.successAlert$.subscribe(() => {
      this.successVisible = true;
      setTimeout(() => this.successVisible = false, 3000);
    });

    this.alertService.warningAlert$.subscribe(() => {
      this.warningVisible = true;
      setTimeout(() => this.warningVisible = false, 3000);
    });
  }
}
