import {Injectable} from '@angular/core';
import {IUser} from "@models/users";
import {UsersLocalStorageService} from "../users-local-storage/users-local-storage.service";
import {UsersStorageService} from "@service/users-storage/users-storage.service";
import {Observable} from "rxjs";
import {IAccessToken} from "@models/accessToken";

@Injectable({
  providedIn: 'root'
})
/**
 * Сервис авторизации пользователей
 */
export class AuthService {
  constructor(private usersLocalStorageService: UsersLocalStorageService,
              private usersStorageService: UsersStorageService) {
  }

  /**
   * Авторизация пользователя
   * @param user
   */
  authUser(user: IUser): Observable<IAccessToken> {
    return this.usersStorageService.authUser(user);
  }

  /**
   * Проверка существования пользователя
   * @param user
   */
  checkUserExist(user: IUser): boolean {
    const isUserExistInLocalStorage = this.usersLocalStorageService.getUser(user.login);
    return !!isUserExistInLocalStorage;
  }

  /**
   * Регистрация пользователя
   * @param user
   * @param useLocalStorage
   */
   addUser(user: IUser, useLocalStorage: boolean = true): Observable<IUser> {
    return this.usersStorageService.saveUser(user);
    // const isUserExist = this.checkUserExist(user);
    // if (isUserExist || !user || typeof user !== 'object') {
    //   return false
    // }
    // if (useLocalStorage) {
    //   this.usersLocalStorageService.saveUser(user);
    // }
    // return true;
  }


  // /**
  //  * Получение пользователя
  //  * @param user
  //  */
  // getUser(user: IUser): IUser | null {
  //   return this.usersLocalStorageService.getUser(user.login);
  // }

  /**
   * Обновление пользователя
   * @param user
   */
  updateUser(user: IUser): boolean {
    const isUserExist = this.checkUserExist(user);
    if (!isUserExist) {
      return false;
    }
    this.usersLocalStorageService.saveUser(user);
    return true;
  }

}
