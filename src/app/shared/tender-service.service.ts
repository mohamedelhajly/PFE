import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderServiceService {

  private apiUrl = 'http://localhost:8200/api/tender'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getTenders(page: number, pageSize: number,id:any,payload:any ={}): Observable<any> {
    const params = new HttpParams()
      .set('pageNo', page.toString())
      .set('pageSize', pageSize.toString())

    return this.http.post(`${this.apiUrl}/all/${id}`,payload, { params });
  }

  updateStatus(request: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/status`, request);
  }
}
