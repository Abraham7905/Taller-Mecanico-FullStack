import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll<T>(endpoint: string, filters?: Record<string, string | number>): Observable<T[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => params = params.set(k, String(v)));
    }
    return this.http.get<T[]>(`${this.base}/${endpoint}/`, { params });
  }

  getOne<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.base}/${endpoint}/${id}/`);
  }

  create<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.base}/${endpoint}/`, body);
  }

  update<T>(endpoint: string, id: number, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.base}/${endpoint}/${id}/`, body);
  }

  patch<T>(endpoint: string, id: number, body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.base}/${endpoint}/${id}/`, body);
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${endpoint}/${id}/`);
  }
}