import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {



  constructor() { }

  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authSubjectObservable: Observable<boolean>  = this.authSubject.asObservable();

  public getToken(): string {
    return localStorage.getItem('auth_token')
  }

  public isAuthenticated(): boolean {
    return (localStorage.getItem('auth_token') === null ? false : true)
  }

  public saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.authSubject.next(true);
  }

  public removeToken(): void {
    localStorage.removeItem('auth_token');
    this.authSubject.next(false);
  }


}
