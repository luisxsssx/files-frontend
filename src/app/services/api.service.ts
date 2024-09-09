import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../../models/api';
import { Observable } from 'rxjs';
import { File, Folder } from '../../models/file';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBaseFolderContent(): Observable<File[]> {
    return this.http.get<File[]>(endpoints.content.getContent);
  }

  getFolderContent(path: string): Observable<string[]> {
    const url = endpoints.content.getFolderContent(path);
    return this.http.get<string[]>(url);
  }

  // Filter folders
  getFolders(path: string): Observable<Folder[]> {
    return this.http.get<Folder[]>(endpoints.content.getFolders(path));
  }

  // Filter folders
  getFiles(path: string): Observable<File[]> {
    return this.http.get<File[]>(endpoints.content.getFiles(path));
  }

  getPaperBin(): Observable<File[]> {
    return this.http.get<File[]>(endpoints.content.getPaperBin);
  }

  ///////////////////////
  /// POST OPERATIONS ///
  ///////////////////////

  addFile(file: File): Observable<File> {
    return this.http.post<File>(endpoints.add.postFiles, file);
  }
  
}
