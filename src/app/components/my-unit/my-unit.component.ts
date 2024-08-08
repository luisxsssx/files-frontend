import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { File, Folder } from '../../../models/file';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { SearchBarComponent } from "../../layout/search-bar/search-bar.component";


@Component({
  selector: 'app-my-unit',
  standalone: true,
  imports: [MatIconModule, NgFor, SidebarComponent, SearchBarComponent],
  templateUrl: './my-unit.component.html',
  styleUrl: './my-unit.component.css'
})
export class MyUnitComponent implements OnInit {

  folder: Folder[] = [];
  files: File[] = [];

  constructor(private service: ApiService, private route: Router) { }

  ngOnInit(): void {

  }

  loadRootContent(): void {
    this.service.getBaseFolderContent().subscribe(
      data => {
        console.log('Files:', data);
        this.files = data;
      },
      error => console.log('Error loading base folder content,', error)
    );
  }

}
