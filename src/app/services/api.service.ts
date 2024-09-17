import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../../models/api';
import { Observable } from 'rxjs';
import { FileModel, FolderModel } from '../../models/file';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private urlBase = "http://localhost:8080/home/upload"
  private urlFolder = "http://localhost:8080/home/folder/create"

  constructor(private http: HttpClient) {}

  getBaseFolderContent(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(endpoints.content.getContent);
  }

  getFolderContent(path: string): Observable<string[]> {
    const url = endpoints.content.getFolderContent(path);
    return this.http.get<string[]>(url);
  }

  // Filter folders
  getFolders(path: string): Observable<FolderModel[]> {
    return this.http.get<FolderModel[]>(endpoints.content.getFolders(path));
  }

  // Filter folders
  getFiles(path: string): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(endpoints.content.getFiles(path));
  }

  getPaperBin(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(endpoints.content.getPaperBin);
  }

  ///////////////////////
  /// POST OPERATIONS ///
  ///////////////////////

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();

    return this.http.post<any>(this.urlBase, formData, {headers});
  }

  createFolder(folderName: string): Observable<string> {
    const params = new HttpParams().set('folderName', folderName);

    return this.http.post<string>(this.urlFolder, {}, {params});
  }

 
  
}
