import { Component, OnInit } from '@angular/core';
import { FileModel, FolderModel } from '../../../models/file';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isNavbarCollapse = true;
  folders: FolderModel[] = [];
  path: string = '';

  constructor(
    private service: ApiService,
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      const path = params['path'];
      this.loadData(path || '');
    });
  }

  toggleSidebar(): void {
    this.isNavbarCollapse = !this.isNavbarCollapse;
    if (!this.isNavbarCollapse) {
      this.loadData(this.path);
    }
  }

  onFolderClick(folderName: string): void {
    this.route.navigate([], {
      relativeTo: this.router,
      queryParams: { path: folderName },
      queryParamsHandling: 'merge'
    });
  }

  private loadData(path?: string): void {
    this.service.getFolders(path || this.path).subscribe({
      next: (data) => {
        this.folders = data;
        console.log('Folders loaded:', data);
      },
      error: (err) => console.error('Error loading folders:', err)
    });
  }
}