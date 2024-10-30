import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

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

  constructor(private service: ApiService, private alertService: AlertService, private router: Router) { }

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
          this.onFolderCreate = true;
          this.showForm = false;
          this.router.navigateByUrl('my-unit', { skipLocationChange: true })
          this.resetForm();
          setTimeout(() => this.onFolderCreate = false, 4000)
        },
        error: (error) => {
          console.error('Error creating folder', error);
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
