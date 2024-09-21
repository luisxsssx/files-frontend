import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileModel, FolderModel } from '../../../../models/file';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { FilterPipe } from "../../../pipes/filter.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [MatIconModule, NgFor, NgClass, NgIf, FilterPipe, FormsModule, CommonModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent implements OnInit {
  show: 'files' | 'folder' | null = null;
  items: (FileModel | FolderModel)[] = [];
  files: FileModel[] = [];
  searchContent = '';
  isActive = false;

  data: {name: string; creationDate: Date} [] = [...this.items];
  orderDate: boolean = false;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  itemHasSize(item: FileModel | FolderModel): item is FileModel {
    return (item as FileModel).size !== undefined;
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

        this.sortByDate();
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

        this.sortByDate();
      },
      error => {
        console.log('Error getting folders', error)
      }
    )
  }

  sortByDate() {
    this.items.sort((a, b) => b.creationDate.getTime()- a.creationDate.getTime());
  }
}