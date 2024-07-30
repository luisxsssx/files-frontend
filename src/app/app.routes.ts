import { Routes } from '@angular/router';
import { homedir } from 'node:os';
import { HomeComponent } from './components/home/home.component';
import { FolderContentComponent } from './components/folder-content/folder-content.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'content/:path', component: FolderContentComponent },
];