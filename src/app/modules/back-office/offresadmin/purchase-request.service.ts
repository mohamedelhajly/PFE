import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {
  private apiUrl = 'http://localhost:8200/api';

  constructor(private http: HttpClient) {}

  getPurchaseRequests(tenderId: string, pageNo: number, pageSize: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchase-request/all/${tenderId}?pageNo=${pageNo}&pageSize=${pageSize}`,{});
  }

  downloadFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/storage/${filename}`, { responseType: 'blob' });
  }

  uploadFile(file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/storage/upload/${type}`, formData);
  }
}
