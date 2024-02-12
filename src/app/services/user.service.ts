import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser, IUserToken } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: BehaviorSubject<string | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<string | null>(null);
  }

  baseUrl: string = "https://happyhippoapi.onrender.com/happyhippouser";

  getUser(): Observable<string | null> {
    return this.user;
  }

  signIn(credentials: IUser): Observable<IUserToken> {
    return this.http.post<IUserToken>(this.baseUrl + '/login', credentials)
      .pipe(map((response: IUserToken) => {
        this.user.next(response.username);
        return response;
      }));
  }

  signOut() {
    this.user.next(null);
  }

  createUser(credentials: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + '/register', credentials);
  }
}
