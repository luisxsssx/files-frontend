import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-paperbin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './paperbin.component.html',
  styleUrl: './paperbin.component.css'
})
export class PaperbinComponent implements OnInit {

  constructor(private tittle: Title) { }

  ngOnInit(): void {
    this.tittle.setTitle('Papper bin - Home Cloud')
  }

}
