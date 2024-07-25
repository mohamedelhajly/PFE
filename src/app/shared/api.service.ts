import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class ApiService {
  baseURL = "http://localhost:8200/api/";
  constructor(private http: HttpClient) {}
  get<T>(
    url: string,
    params: HttpParams = new HttpParams(),
    responseType = 'json'
  ): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`, {
      headers: this.headers,
      params,
      responseType: responseType as 'json',
    });
  }
  // post<response, request>
  post<T, D>(
    url: string,
    data?: D,
    header?: HttpHeaders,
    params?: HttpParams,
    responseType = 'json'
  ): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, JSON.stringify(data), {
      headers: header ?? this.headers,
      params,
      responseType: responseType as 'json',
    });
  }
  put<T, D>(url: string, data?: D): Observable<T> {
    return this.http.put<T>(`${this.baseURL}${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}${url}`, {
      headers: this.headers,
    });
  }
  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }
  getFileLink(fileName: string) {
    return `${this.baseURL}/file/${fileName}`;
  }
}
