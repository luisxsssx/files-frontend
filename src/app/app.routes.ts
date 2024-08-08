import { Routes } from '@angular/router';
import { homedir } from 'node:os';
import { HomeComponent } from './components/home/home.component';
import { FolderContentComponent } from './components/folder-content/folder-content.component';
import { MyUnitComponent } from './components/my-unit/my-unit.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'my-unit', component: MyUnitComponent },
    { path: 'content/:path', component: FolderContentComponent },
];