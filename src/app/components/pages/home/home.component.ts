import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';;
import { MatIconModule } from '@angular/material/icon';
import { File, Folder } from '../../../../models/file';
import { UnitComponent } from "../../../layout/unit/unit.component";
import { SearchBarComponent } from "../../../layout/search-bar/search-bar.component";
import { SidebarComponent } from "../../../layout/sidebar/sidebar.component";
import { FolderContentComponent } from "../../folder-content/folder-content.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, SearchBarComponent, MatIconModule, NgClass, UnitComponent, SidebarComponent, FolderContentComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  isNavbarCollapse = true;
  folders: Folder[] = [];
  files: File[] = [];
  path: string = '';
  firstClick = true;

  constructor(private service: ApiService, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Home Cloud');
  }

  // Load files
  loadFiles(path: string = '') {
    this.service.getFiles(path).subscribe(
      data => {
        this.files = data;
        console.log('Files: ', this.files);
      },
      error => {
        console.log('Error getting folders', error);
      }
    )
  }

  navigate(path: string): void {
    this.router.navigate(['/content', path]);
  }
}
