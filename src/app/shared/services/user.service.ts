import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = `/users`;
  
  constructor(private http: HttpClient) { }

  get(id: string): Observable<Array<User>> {
    const path = `${this.path}/${id}`;
    return this.http.get<Array<User>>(path);
  }

  list(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.path);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.path, data);
  }

  update(id: string, data: any) {
    return this.http.put<any>(`${this.path}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.path}/${id}`);
  }

  deactivate(id: string): Observable<any> {
    return this.http.post<any>(`${this.path}/${id}/lifecycle/deactivate`, {});
  }
}
