import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AddElementComponent } from "../../unity/add-file/add-file.component";
import { ApiService } from '../../../services/api.service';
import { FileModel } from '../../../../models/file';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-paperbin',
  standalone: true,
  imports: [SidebarComponent, AddElementComponent, NgFor],
  templateUrl: './paperbin.component.html',
  styleUrl: './paperbin.component.css'
})
export class PaperbinComponent implements OnInit {

  files: FileModel[] = [];

  constructor(private tittle: Title, private service: ApiService) { }

  ngOnInit(): void {
    this.tittle.setTitle('Papper bin - Home Cloud')
    this.loadPaperBin();
  }

  loadPaperBin(): void {
    this.service.getPaperBin().subscribe(
      data => {
        console.log('Paper-bin content: ', data);
        this.files = data;
      },
      error => {
        console.log('Error getting files', error);
      }
    )
  }

}
