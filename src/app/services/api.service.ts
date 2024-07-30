import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../../models/api';
import { Observable } from 'rxjs';
import { File } from '../../models/file';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBaseFolderContent(): Observable<string[]> {
    return this.http.get<string[]>(endpoints.files.getContent);
  }

  getFolderContent(path: string): Observable<string[]> {
    const params = new HttpParams().set('path', path);
    return this.http.get<string[]>(endpoints.files.getContent, { params });
  }
}
