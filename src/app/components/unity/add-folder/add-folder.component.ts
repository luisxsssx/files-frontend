import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FilesService } from '../../../services/files.service';

@Component({
  selector: 'app-add-folder',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.css',
})
export class AddFolderComponent implements OnInit, OnDestroy {
  folderName: string = '';
  onFolderCreate: boolean = false;
  showForm: boolean = false;

  constructor(private service: ApiService, private alertService: AlertService, private router: Router, private fileService: FilesService) { }

  ngOnInit(): void { }
  ngOnDestroy(): void { }

  createFolder() {
    if (this.folderName) {
      this.service.createFolder(this.folderName).subscribe({
        next: (respose) => {
          setTimeout(() => {
            console.log('Folder created successfully', respose);
            this.showForm = false;
          })
          this.showForm = false;
          this.router.navigateByUrl('my-unit', { skipLocationChange: true })
          this.resetForm();
          this.alertService.showSuccesFolderAlert();
          this.fileService.notifyContentChanged();
        },
        error: (error) => {
          console.error('Error creating folder', error);
          this.alertService.showWarningFodlerAlert();
        },
      });
    } else {
      console.error('Folder name is required');
    }
  }

  resetForm() {
    setTimeout(() => {
      this.folderName = "";
    })
  }
}
