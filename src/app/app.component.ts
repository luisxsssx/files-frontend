import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OfflineComponent } from "./components/pages/offline/offline.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from "./components/notification/alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink, CommonModule, FormsModule, OfflineComponent, HttpClientModule, FormsModule, CommonModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}