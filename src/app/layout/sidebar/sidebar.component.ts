import { Component, OnInit } from '@angular/core';
import { File, Folder } from '../../../models/file';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, NgFor, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {

  isNavbarCollapse = true;
  folders: Folder[] = [];
  files: File[] = [];
  path: string = '';
  firstClick = true;

  constructor(private service: ApiService, private route: Router) { }

  ngOnInit(): void {

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

  // Load folders in sidebar
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

}
