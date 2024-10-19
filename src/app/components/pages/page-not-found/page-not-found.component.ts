import { Component } from '@angular/core';
import { SidebarComponent } from "../../../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
