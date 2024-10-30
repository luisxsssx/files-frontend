import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';;
import { MatIconModule } from '@angular/material/icon';
import { FileModel, FolderModel } from '../../../../models/file';
import { UnitComponent } from "../unit/unit.component";
import { SidebarComponent } from "../../../layout/sidebar/sidebar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, MatIconModule, NgClass, UnitComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  [x: string]: any;

  isNavbarCollapse = true;
  folders: FolderModel[] = [];
  files: FileModel[] = [];
  path: string = '';
  firstClick = true;

  constructor(private service: ApiService, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Home Cloud');
  }

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
