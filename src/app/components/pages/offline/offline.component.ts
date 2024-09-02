import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offline',
  standalone: true,
  imports: [NgIf, MatIconModule],
  templateUrl: './offline.component.html',
  styleUrl: './offline.component.css'
})
export class OfflineComponent implements OnInit {

  isOnline: boolean = true;
  showOnlineMessage: boolean = false;
  private subscription: Subscription | null = null;

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.subscription = this.networkService.getOnlineStatus().subscribe(status => {
      if (!status) {
        this.isOnline = false;
        this.showOnlineMessage = false;
      } else if (this.isOnline === false) {
        this.isOnline = true;
        this.showOnlineMessage = true;
        setTimeout(() => {
          this.showOnlineMessage = false;
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}