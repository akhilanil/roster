import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {



  constructor() { }

  public getToken(): string {
    return localStorage.getItem('auth_token')
  }

  public isAuthenticated(): boolean {
    return (localStorage.getItem('auth_token') === null ? false : true)
  }

  public saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  public removeToken(): void {
    localStorage.removeItem('auth_token');
  }


}
