import { Component, OnInit } from '@angular/core';
import { File, Folder } from '../../../models/file';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AddElementComponent } from "../../components/add-file/add-file.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, NgFor, MatIconModule, RouterLink, AddElementComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {

  isNavbarCollapse = true;
  folders: Folder[] = [];
  files: File[] = [];
  path: string = '';
  firstClick = true;

  constructor(private service: ApiService, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      const path = params['path'];
      if(path) {
        this.loadSubfolder(path);
      } else {
        this.loadFolders();
      }
    })
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

  // Load subfolders
  loadSubfolder(folderName: string): void {
    this.service.getFolders(folderName).subscribe(
      data => {
        this.folders = data;
        console.log('Subfolders: ', data);
      },
      error => {
        console.log('Error getting folders', error);
      }
    );
  }

  // Get subfolder
  onFolderClick(folderName: string): void {
    this.route.navigate([], {
      relativeTo: this.router,
      queryParams: {path: folderName},
      queryParamsHandling: 'merge'
    })
  }

}
