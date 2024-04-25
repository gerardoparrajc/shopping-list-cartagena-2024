import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private urlServer: string = 'https://dummyjson.com';

  public get isLogged(): boolean {
    return sessionStorage.getItem('isLogged') === 'true';
  }
  public set isLogged(value: boolean) {
    sessionStorage.setItem('isLogged', String(value));
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.urlServer}/auth/login`, {
      username: username,
      password: password
    });
  }

  register(username: string, password: string) {
    return this.http.post(`${this.urlServer}/users/add`, {
      username: username,
      password: password
    });
  }

  logout() {
    this.isLogged = false;
  }
}
