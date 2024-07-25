import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private baseUrl = 'http://localhost:8200/api/tender/all';
  private baseUrl2 = 'http://localhost:8200/api/purchase-request/all';
  private baseUrl3 = 'http://localhost:8200/api/purchase-request/all';

  constructor(private http: HttpClient) {}

  getTenders(pageNo: number, pageSize: number, payload: any): Observable<any> {
    const url = `${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.post<any>(url, payload);
  }
  getTenders2(pageNo: number, pageSize: number, payload: any): Observable<any> {
    const url = `${this.baseUrl2}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.post<any>(url, payload);
  }
  getTenders3(pageNo: number, pageSize: number, payload: any ,id:any): Observable<any> {
    const url = `${this.baseUrl3}/${id}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.post<any>(url, payload);
  }
}
