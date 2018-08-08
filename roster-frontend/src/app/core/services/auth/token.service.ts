import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('token')
  }

  public isAuthenticated(): boolean {

    return (localStorage.getItem('token') === null ? false : true)

  }

}
