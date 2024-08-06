import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { MatIconModule } from '@angular/material/icon';
import { Folder } from '../../../models/file';
import { error } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, SearchBarComponent, MatIconModule, NgClass],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isNavbarCollapse = true;
  folders: Folder[] = [];
  files: string[] = [];
  path: string = '';
  firstClick = true;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadBaseFolderContent();
  }

  toggleSidebar(): void {
    this.isNavbarCollapse = !this.isNavbarCollapse;
    if (!this.isNavbarCollapse) {
      if (this.firstClick) {
        this.loadFolders(this.path, true);
        this.firstClick = false;
      } else {
        this.loadFolders(this.path, false);
      }
    }
  }

  loadFolders(path: string = '', inmediate: boolean = false): void {
    if (inmediate) {
      this.service.getFolders(path).subscribe(
        data => {
          this.folders = data;
          console.log('Folders:', this.folders);
        },
        error => {
          console.log('Error getting folders', error);
        }
      );
    } else {
      setTimeout(() => {
        this.service.getFolders(path).subscribe(
          data => {
            this.folders = data;
            console.log('Folders:', this.folders);
          },
          error => {
            console.log('Error getting folders', error);
          }
        );
      }, 2000);
    }
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
