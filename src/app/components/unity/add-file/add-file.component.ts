import { Component } from '@angular/core';
import { FileModel } from '../../../../models/file';
import { ApiService } from '../../../services/api.service';
import { CommonModule, NgIf } from '@angular/common';

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

  constructor(private service: ApiService){}

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
        next: (response) => console.log('File uploaded succesfully!', response),
        error: (error) => console.error('Error uploading file:', error)
      });
    }
  }
}