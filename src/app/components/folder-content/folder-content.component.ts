import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { SearchBarComponent } from "../../layout/search-bar/search-bar.component";

@Component({
  selector: 'app-folder-content',
  standalone: true,
  imports: [NgFor, SidebarComponent, SearchBarComponent],
  templateUrl: './folder-content.component.html',
  styleUrl: './folder-content.component.css'
})

export class FolderContentComponent implements OnInit {

  files: string[] = [];
  path: string = '';

  constructor(private service: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.path = params.get('path') || '';
      this.loadFolderContent(this.path);
    });
  }

  loadFolderContent(path: string): void {
    this.service.getFolderContent(path).subscribe(
      data => {
        console.log('Folder Content:', data);
        this.files = data;
      },
      error => console.error('Error loading folder content', error)
    );
  }

}
