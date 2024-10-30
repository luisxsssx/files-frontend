import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileModel } from '../../../../models/file';
import { ApiService } from '../../../services/api.service';
import { CommonModule, NgIf } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { FilesService } from '../../../services/files.service';

@Component({
  selector: 'app-add-element',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddElementComponent implements OnInit, OnDestroy {
  selectedFile: File | undefined;
  fileModel!: FileModel;
  onFileUploaded: boolean = false;

  constructor(private service: ApiService, private alertService: AlertService, private fileService: FilesService) { }

  ngOnInit(): void { }
  ngOnDestroy(): void { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.fileModel = {
        name: file.name,
        size: `${file.size}`,
        creationDate: new Date()
      };
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          console.log('File uploaded successfully!', response);
          this.resetForm();
          this.onFileUploaded = false;
          this.fileService.notifyContentChanged();
          setTimeout(() => {
            this.onFileUploaded = true;
          }, 4000);
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.warning();
        }
      });
    }
  }

  resetForm() {
    this.selectedFile = undefined;
    this.fileModel = { name: '', size: '', creationDate: new Date() };
  }

  warning() {
    setTimeout(() => {
      this.alertService.showWarningAlert();
    }, 1000);
  }
}
