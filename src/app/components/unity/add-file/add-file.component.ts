import { Component, EventEmitter, Output } from '@angular/core';
import { FileModel } from '../../../../models/file';
import { ApiService } from '../../../services/api.service';
import { CommonModule, NgIf } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-element',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './add-file.component.html',
  styleUrl: './add-file.component.css'
})
export class AddElementComponent {
  selectedFile: File | undefined;
  fileModel!: FileModel;

  constructor(private service: ApiService, private alertService: AlertService, private router: Router){}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if(file) {
      this.selectedFile = file;

      this.fileModel = {
        name: file.name,
        size: `${file.size}`,
        creationDate: new Date()
      };
    }
  }

  onUpload() {
    if(this.selectedFile) {
      this.service.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          console.log('File uploaded succesfully!', response);
          this.alertService.showSuccessAlert();
          this.router.navigateByUrl('my-unit', {skipLocationChange: true});

          this.resetForm();
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.alertService.showWarningAlert();
        }
      });
    }
  }

  resetForm() {
    this.selectedFile = undefined;
    this.fileModel = { name: '', size: '', creationDate: new Date() }; 
  }

}