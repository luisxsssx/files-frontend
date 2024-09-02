import { Routes } from '@angular/router';
import { homedir } from 'node:os';
import { HomeComponent } from './components/pages/home/home.component';
import { FolderContentComponent } from './components/pages/folder-content/folder-content.component';
import { MyUnitComponent } from './components/unity/my-unit/my-unit.component';
import { PaperbinComponent } from './components/paperbin/paperbin/paperbin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'my-unit', component: MyUnitComponent },
    { path: 'paperbin', component: PaperbinComponent },
    { path: 'content', component: FolderContentComponent },
];