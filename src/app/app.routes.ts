import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyUnitComponent } from './components/unity/my-unit/my-unit.component';
import { PaperbinComponent } from './components/paperbin/paperbin/paperbin.component';
import { ContentComponent } from './components/pages/content/content.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'my-unit', component: MyUnitComponent },
    { path: 'paperbin', component: PaperbinComponent },
    { path: 'folder/:name', component: ContentComponent },
    { path: '**', component: PageNotFoundComponent }
];