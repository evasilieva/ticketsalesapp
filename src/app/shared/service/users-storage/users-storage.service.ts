import {Injectable} from '@angular/core';
import {IUser} from "@models/users";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccessToken} from "@models/accessToken";

@Injectable({
  providedIn: 'root'
})
export class UsersStorageService {

  constructor(private http: HttpClient) {
  }

  public authUser(user: IUser): Observable<IAccessToken> {
    return this.http.post<IAccessToken>('http://localhost:3000/users/login', user);
  }


  public saveUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/users', user);
  }

  public getUserById(userId: string): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:3000/users/' + userId);
  }

  public removeUser(user: IUser): Observable<IUser> {
    return this.http.delete<IUser>('http://localhost:3000/users/' + user.id);
  }


  // public getUser(userName: string): IUser | null {
  //   const item = this.localStorageService.getItem(
  //     this.getStorageUserKey(userName)
  //   );
  //   if (!item) {
  //     return null;
  //   }
  //   return JSON.parse(item);
  // }

  // public removeUser(user: IUser) {
  //   localStorage.removeItem(
  //     this.getStorageUserKey(user.login)
  //   );
  // }
  //
  // public clear() {
  //   localStorage.clear();
  // }
}
