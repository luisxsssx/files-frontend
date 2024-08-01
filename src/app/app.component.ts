import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SearchBarComponent } from "./components/search-bar/search-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink, CommonModule, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}