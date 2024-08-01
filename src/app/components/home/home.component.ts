import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, SearchBarComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  files: string[] = [];

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadBaseFolderContent();
  }

  loadBaseFolderContent(): void {
    this.service.getBaseFolderContent().subscribe(
      data => {
        console.log('Files:', data);
        this.files = data;
      },
      error => console.error('Error loading base folder content', error)
    );
  }

  navigate(path: string): void {
    this.router.navigate(['/content', path]);
  }

}
