import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080';

  getSecretData(): Observable<any> {
    return this.http.get(`${this.API_URL}/protected/data`);
  }

  getAdminData(): Observable<any> {
    return this.http.get(`${this.API_URL}/protected/admin`);
  }
}
