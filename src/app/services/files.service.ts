import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, Subject, tap } from 'rxjs';
import { endpoints } from '../../models/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  private contentChangedSubject = new Subject<void>();
  contentChanged$ = this.contentChangedSubject.asObservable();

  public notifyContentChanged(): void {
    this.contentChangedSubject.next();
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();

    return this.http.post<any>(endpoints.add.postFiles, formData, { headers }).pipe(
      tap(() => this.notifyContentChanged()),
      catchError(error => {
        console.error('Error uploading file:', error);
        return of(null);
      })
    );
  }

  deleteItem(path: string): Observable<any> {
    const url = endpoints.delete.deleteItem(path);
    return this.http.delete<any>(url).pipe(
      tap(() => this.notifyContentChanged()),
      catchError(error => {
        console.error('Error deleting item:', error);
        return of(null);
      })
    );
  }


}