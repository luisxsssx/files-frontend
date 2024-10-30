import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../../models/api';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { FileModel, FolderModel } from '../../models/file';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBaseFolderContent(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(endpoints.content.getContent);
  }

  getFolderContent(path: string): Observable<string[]> {
    const url = endpoints.content.getFolderContent(path);
    return this.http.get<string[]>(url);
  }

  getFolders(path: string): Observable<FolderModel[]> {
    return this.http.get<FolderModel[]>(endpoints.content.getFolders(path)).pipe(
      map((folders: FolderModel[]) => folders.map(folder => ({
        ...folder,
        creationDate: new Date(folder.creationDate)
      }))),
      tap(folders => {
        if (folders.length === 0) {
          console.warn('No folder found');
        }
      }),
      catchError(() => {
        console.error('Error getting folders');
        return of([]);
      })
    );
  }

  getFiles(path: string): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(endpoints.content.getFiles(path)).pipe(
      map((files: FileModel[]) => files.map(file => ({
        ...file,
        creationDate: new Date(file.creationDate)
      }))),
      tap(files => {
        if (files.length === 0) {
          console.warn('No files found');
        }
      }),
      catchError(() => {
        console.error('Error getting files');
        return of([]);
      })
    );
  }

  getPaperBin(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(endpoints.content.getPaperBin);
  }

  getAllContent(type: string): Observable<(FileModel | FolderModel)[]> {
    if (type !== 'file' && type !== 'folder') {
      throw new Error(`Invalid type`);
    }

    const url = endpoints.content.getAllContent(type);

    return this.http.get<(FileModel | FolderModel)[]>(url).pipe(
      map((items: (FileModel | FolderModel)[]) =>
        items.map(item => ({
          ...item,
          creationDate: new Date(item.creationDate)
        }))
      )
    );
  }



  createFolder(folderName: string): Observable<string> {
    const params = new HttpParams().set('folderName', folderName);

    return this.http.post<string>(endpoints.add.createFolder, {}, { params });
  }
}
