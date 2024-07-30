import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';
import { File } from '../../../models/file';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
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
