import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { SearchBarComponent } from '../../../layout/search-bar/search-bar.component';
import { ApiService } from '../../../services/api.service';
import { Folder } from '../../../../models/file';


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

  constructor(private service: ApiService, private route: Router, private tittle: Title) { }

  ngOnInit(): void {
    this.tittle.setTitle('My unit - Home Cloud');
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
