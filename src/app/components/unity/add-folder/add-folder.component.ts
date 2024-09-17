import { Component } from '@angular/core';
import { FolderModel } from '../../../../models/file';
import { ApiService } from '../../../services/api.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-folder',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.css',
})
export class AddFolderComponent {
  folderName: string = '';

  constructor(private service: ApiService) {}

  createFolder() {
    if (this.folderName) {
      this.service.createFolder(this.folderName).subscribe({
        next: (respose) => {
          console.log('Folder created successfully', respose);
        },
        error: (error) => {
          console.error('Error creating folder', error);
        },
      });
    } else {
      console.error('Folder name is required');
    }
  }
}
