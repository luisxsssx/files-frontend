import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileModel, FolderModel } from '../../../../models/file';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { FilterPipe } from "../../../pipes/filter.pipe";
import { FormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [MatIconModule, NgFor, NgIf, FilterPipe, FormsModule, CommonModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent implements OnInit {
  show: 'files' | 'folder' | null = null;
  items: (FileModel | FolderModel)[] = [];
  files: FileModel[] = [];
  searchContent = '';
  isActive = false;
  content: string[] = [];
  errorMessage: string = '';

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  itemHasSize(item: FileModel | FolderModel): item is FileModel {
    return (item as FileModel).size !== undefined;
  }

  loadFiles(): void {
    this.service.getAllContent('file').subscribe({
      next: (data: (FileModel | FolderModel)[]) => {
        this.items = data.filter((item): item is FileModel => 'size' in item);
        this.show = 'files';
        console.log('Files', this.items)
        this.sortByDate();
      },
      error: (error) => {
        console.error('Error al cargar archivos:', error);
      }
    });
  }

  loadFolders(): void {
    this.service.getAllContent('folder').subscribe({
      next: (data: (FileModel | FolderModel)[]) => {
        this.items = data.filter((item): item is FolderModel => !('size' in item));
        this.show = 'folder';
        this.sortByDate();
      },
      error: (error) => {
        console.error('Error al cargar carpetas:', error);
      }
    });
  }

  sortByDate() {
    this.items.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
  }
}