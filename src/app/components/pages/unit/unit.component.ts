import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { File, Folder } from '../../../../models/file';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { AddElementComponent } from "../../unity/add-file/add-file.component";
import { AddFolderComponent } from "../../unity/add-folder/add-folder.component";

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [MatIconModule, NgFor, NgClass, NgIf, AddElementComponent, AddFolderComponent],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent implements OnInit {
  show: 'files' | 'folder' | null = null;
  items: (File | Folder)[] = [];
  files: File[] = [];

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  itemHasSize(item: File | Folder): item is File {
    return (item as File).size !== undefined;
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

  loadFiles(path: string = '') {
    this.service.getFiles(path).subscribe(
      data => {
        this.items = data;
        console.log('Files: ', this.items);
        this.show = 'files';
      },
      error => {
        console.log('Error getting files', error);
      }
    )
  }

  loadFolders(path: string = '') {
    this.service.getFolders(path).subscribe(
      data => {
        this.items = data;
        console.log('Folders: ' + this.items);
        this.show = 'folder';
      },
      error => {
        console.log('Error getting folders', error)
      }
    )
  }
}