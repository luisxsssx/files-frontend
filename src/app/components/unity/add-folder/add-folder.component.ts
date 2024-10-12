import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-folder',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.css',
})
export class AddFolderComponent {
  folderName: string = '';

  constructor(private service: ApiService, private alertService: AlertService, private router: Router) {}

  createFolder() {
    if (this.folderName) {
      this.service.createFolder(this.folderName).subscribe({
        next: (respose) => {
          console.log('Folder created successfully', respose);
          this.success();
          this.router.navigateByUrl('my-unit', {skipLocationChange: true})
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating folder', error);
          this.warning();
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

  success() {
    setTimeout(() => {
      this.alertService.showSuccessAlert();
    }, 1000)
  }
  
  warning() {
    setTimeout(() => {
      this.alertService.showWarningAlert();
    }, 1000)
  }
}
