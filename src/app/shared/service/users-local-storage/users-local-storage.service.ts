import {Injectable} from '@angular/core';
import {LocalStorageService} from "@service/locat-storage/local-storage.service";
import {IUser} from "@models/users";

@Injectable({
  providedIn: 'root'
})
/**
 * Сервис для работы с локальным хранилищем пользователей
 */
export class UsersLocalStorageService {

  constructor(private localStorageService: LocalStorageService) {
  }

  private getStorageUserKey(userName: string) {
    const userPrefix = 'user_';
    return userPrefix + userName;
  }

  public saveUser(user: IUser) {
    const userData = JSON.stringify(user);
    this.localStorageService.setItem(
      this.getStorageUserKey(user.login),
      userData
    );
  }

  public getUser(userName: string): IUser | null {
    const item = this.localStorageService.getItem(
      this.getStorageUserKey(userName)
    );
    if (!item) {
      return null;
    }
    return JSON.parse(item);
  }

  public removeUser(user: IUser) {
    localStorage.removeItem(
      this.getStorageUserKey(user.login)
    );
  }

  public clear() {
    localStorage.clear();
  }
}
