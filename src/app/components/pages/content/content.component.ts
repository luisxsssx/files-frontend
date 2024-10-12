import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarComponent } from "../../../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [SidebarComponent, RouterLink],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  folderName: string | null = '';
  
  constructor(private router: ActivatedRoute){}

  ngOnInit(): void {
    this.folderName = this.router.snapshot.paramMap.get('name');
    console.log('Folder Name:', this.folderName);
  }
}
