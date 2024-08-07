import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../../models/api';
import { Observable } from 'rxjs';
import { Folder } from '../../models/file';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBaseFolderContent(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.content.getContent);
  }

  getFolderContent(path: string): Observable<string[]> {
    const url = endpoints.content.getFolderContent(path);
    return this.http.get<string[]>(url);
  }

  // Filter folders
  getFolders(path: string = ''): Observable<Folder[]> {
    return this.http.get<Folder[]>(endpoints.content.getFolders(path));
  }

}
