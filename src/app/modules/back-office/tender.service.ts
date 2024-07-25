import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private apiUrl = 'http://localhost:8200/api/tender'; // Adjust this to your API URL

  constructor(private http: HttpClient) {}

  getAllTenders(
    page: number,
    pageSize: number,
    sortBy: string,
    sort: string,
    criteria: any
  ): Observable<any> {
    const params = new HttpParams()
      .set('pageNo', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sort', sort);

    return this.http.post<any>(`${this.apiUrl}/all`, criteria, { params });
  }

  saveTender(tender: any): Observable<Map<string, string>> {
    return this.http.post<Map<string, string>>(`${this.apiUrl}/save`, tender);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8200/api/storage', formData);
  }
}
