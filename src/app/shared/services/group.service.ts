import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from '../models/group.model';
import { User } from '../models/user.model';

import { Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private path = `/groups`;
  
  constructor(private http: HttpClient) { }

  get(id: string): Observable<Group> {
    const path = `${this.path}/${id}`;
    return this.http.get<Group>(path);
  }

  getByName(name: string): Observable<Array<Group>> {
    const path = `${this.path}?q=${name}`;
    return this.http.get<Array<Group>>(path);
  }

  getUsers(id: string): Observable<Array<User>> {
    const path = `${this.path}/${id}/users`;
    return this.http.get<Array<User>>(path);
  }

  getMembers(groupName: string): Observable<Array<User>> {
    return this.getByName(groupName)
      .pipe(
        mergeMap((groups: Array<Group>) => {
          if (groups.length) {
            return this.getUsers(groups[0].id);
          } else {
            return throwError(new Error("No data found..."));
          }
        })
      );
  }

  removeUser(userId: string, groupId: string): Observable<any> {
    return this.http.delete<any>(`${this.path}/${groupId}/users/${userId}`);
  }

  addUser(userId: string, groupId: string): Observable<any> {
    return this.http.put<any>(`${this.path}/${groupId}/users/${userId}`, {});
  }

  list(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.path);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.path, data);
  }

  update(id: number, data: any) {
    return this.http.patch<any>(`${this.path}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.path}/${id}`);
  }
}