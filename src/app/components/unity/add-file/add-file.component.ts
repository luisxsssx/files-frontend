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
          this.fileService.notifyContentChanged();
          this.resetForm();
          this.alertService.showSuccessAlert();
        },
        error: (error) => {
          this.alertService.showWarningAlert();
        }
      });
    }
  }

  resetForm() {
    this.selectedFile = undefined;
    this.fileModel = { name: '', size: '', creationDate: new Date() };
    const inputFile: HTMLInputElement | null = document.querySelector('input[type="file"]');
    if (inputFile) {
      inputFile.value = '';
    }
  }

  warning() {
    setTimeout(() => {
      this.alertService.showWarningAlert();
    }, 1000);
  }
}
