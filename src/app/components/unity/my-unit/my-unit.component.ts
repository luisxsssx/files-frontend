import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { ApiService } from '../../../services/api.service';
import { FileModel, FolderModel } from '../../../../models/file';
import { AddElementComponent } from "../add-file/add-file.component";
import { AddFolderComponent } from "../add-folder/add-folder.component";
import { FormsModule } from '@angular/forms';
import { FilterPipe } from "../../../pipes/filter.pipe";

@Component({
  selector: 'app-my-unit',
  standalone: true,
  imports: [MatIconModule, NgFor, NgIf, SidebarComponent, AddElementComponent, CommonModule, AddFolderComponent, FormsModule, FilterPipe],
  templateUrl: './my-unit.component.html',
  styleUrl: './my-unit.component.css'
})
export class MyUnitComponent implements OnInit {

  show: 'files' | 'folder' | null = null;
  items: (FileModel | FolderModel)[] = [];
  folder: FolderModel[] = [];
  files: FileModel[] = [];
  path: string = '';
  isRowCollapse = true;
  searchContent = '';
  firstClick = true;

  constructor(private service: ApiService, private route: Router, private tittle: Title) { }

  ngOnInit(): void {
    this.tittle.setTitle('My unit - Home Cloud');
    this.loadFilesAndFolders();
  }

  itemHasSize(item: File | FolderModel): item is File {
    return (item as File).size !== undefined;
  }

  loadRootContent(): void {
    this.service.getBaseFolderContent().subscribe(
      data => {
        console.log('Files:', this.files);
        this.files = data;
      },
      error => console.log('Error loading base folder content,', error)
    );
  }

  loadFilesAndFolders(path: string = ''): void {
    this.service.getFolders(path).subscribe(
      foldersData => {
        this.items = [...this.items, ...foldersData];
        console.log('Folders: ', foldersData);
      },
      error => console.log('Error getting folders', error)
    );
    this.service.getFiles(path).subscribe(
      filesData => {
        this.files = filesData;
        this.items = [...this.items, ...filesData];
        console.log('Files: ', this.files);
      },
      error => console.log('Error getting files', error)
    );
    this.show = 'files';
  }

  sortByDate() {
    this.items.sort((a, b) => b.creationDate.getTime()- a.creationDate.getTime());
  }

  sortByName() {
    this.items.sort((a, b) => a.name.localeCompare(b.name));
  }

}
