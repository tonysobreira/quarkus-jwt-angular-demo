import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080';

  getHelloData(): Observable<string> {
    // return this.http.get(`${this.API_URL}/hello`);

    return this.http.get(`${this.API_URL}/hello`, {
      responseType: 'text', // ← isso desativa o parse automático de JSON
    });
  }

  getSecretData(): Observable<any> {
    return this.http.get(`${this.API_URL}/protected/data`);
  }

  getAdminData(): Observable<any> {
    return this.http.get(`${this.API_URL}/protected/admin`);
  }
}
