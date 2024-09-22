import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyUnitComponent } from './components/unity/my-unit/my-unit.component';
import { PaperbinComponent } from './components/paperbin/paperbin/paperbin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'my-unit', component: MyUnitComponent },
    { path: 'paperbin', component: PaperbinComponent },
];