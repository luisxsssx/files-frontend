import { Routes } from '@angular/router';
import { homedir } from 'node:os';
import { HomeComponent } from './components/pages/home/home.component';
import { FolderContentComponent } from './components/folder-content/folder-content.component';
import { MyUnitComponent } from './components/my-unit/my-unit.component';
import { PaperbinComponent } from './components/paperbin/paperbin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'my-unit', component: MyUnitComponent },
    { path: 'paperbin', component: PaperbinComponent },
    { path: 'content/:path', component: FolderContentComponent },
];