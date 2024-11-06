import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgIf],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css'
})
export class ToastsComponent implements OnInit {
  fileUploaded: boolean = false;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.successAlert$.subscribe(() => {
      this.fileUploaded = true;
      setTimeout(() => this.fileUploaded = false, 3000);
    });
  }

}