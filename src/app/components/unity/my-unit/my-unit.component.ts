import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { AlertComponent } from "../../notification/alert/alert.component";
import { Subscription } from 'rxjs';
import { FilesService } from '../../../services/files.service';

@Component({
  selector: 'app-my-unit',
  standalone: true,
  imports: [MatIconModule, NgFor, NgIf, SidebarComponent, AddElementComponent, CommonModule, AddFolderComponent, FormsModule, FilterPipe, AlertComponent],
  templateUrl: './my-unit.component.html',
  styleUrls: ['./my-unit.component.css']
})
export class MyUnitComponent implements OnInit, OnDestroy {
  show: 'files' | 'folder' | null = null;
  items: (FileModel | FolderModel)[] = [];
  path: string = '';
  isRowCollapse = true;
  searchContent = '';
  hasData: boolean = true;

  private contentChangedSubscription!: Subscription;

  constructor(private service: ApiService, private router: Router, private title: Title, private fileService: FilesService) { }

  ngOnInit(): void {
    this.title.setTitle('My unit - Home Cloud');
    this.loadContent();

    this.contentChangedSubscription = this.fileService.contentChanged$.subscribe(() => {
      this.loadContent();
    });
  }

  ngOnDestroy(): void {
    this.contentChangedSubscription?.unsubscribe();
  }

  loadContent(path: string = ''): void {
    this.items = [];
    this.hasData = true;

    // Obtener carpetas
    this.service.getFolders(path).subscribe(
      (foldersData: FolderModel[]) => {
        if (foldersData.length > 0) {
          this.items.push(...foldersData);
        }
        console.log('Folders:', foldersData);
        this.checkIfNoData();
      },
      error => {
        console.error('Error getting folders:', error);
        this.checkIfNoData();
      }
    );

    // Obtener archivos
    this.service.getFiles(path).subscribe(
      (filesData: FileModel[]) => {
        if (filesData.length > 0) {
          this.items.push(...filesData);
        }
        console.log('Files:', filesData);
        this.checkIfNoData();
      },
      error => {
        console.error('Error getting files:', error);
        this.checkIfNoData();
      }
    );

    this.show = 'files';
  }

  removeDuplicates(): void {
    const seen = new Set();
    this.items = this.items.filter(item => {
      if (seen.has(item.name)) {
        return false;
      }
      seen.add(item.name);
      return true;
    });
  }

  onSelectFile(folderName: string): void {
    console.log('Navegando a la carpeta:', folderName);
    this.router.navigate(['/folder', encodeURIComponent(folderName)]);
  }

  checkIfNoData(): void {
    this.removeDuplicates();
    this.hasData = this.items.length > 0;
  }

  sortByDate(): void {
    this.items.sort((a, b) => {
      const dateA = 'creationDate' in a ? new Date(a.creationDate).getTime() : 0;
      const dateB = 'creationDate' in b ? new Date(b.creationDate).getTime() : 0;
      return dateB - dateA;
    });
  }

  sortByName(): void {
    this.items.sort((a, b) => a.name.localeCompare(b.name));
  }

  itemHasSize(item: FileModel | FolderModel): item is FileModel {
    return (item as FileModel).size !== undefined;
  }
}
