import { Component } from '@angular/core';
import { File } from '../../../../models/file';

@Component({
  selector: 'app-add-element',
  standalone: true,
  imports: [],
  templateUrl: './add-file.component.html',
  styleUrl: './add-file.component.css'
})
export class AddElementComponent {
  fileData: File | null = null;

  constructor(){}

   onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; 
      
      this.fileData = {
        name: file.name,
        size: Math.round(file.size / 1024) + ' KB', 
        creationDate: new Date(file.lastModified), 
      };

      console.log('Archivo seleccionado:', this.fileData);
    }
  }

  uploadFile() {
    if(this.fileData)
      console.log('Upload file:', this.fileData)
  }


}
