import {Injectable} from '@angular/core';
import {IUser} from "@models/users";
import {CurrentUserLocalStorageService} from "@service/curent-user-local-storage/current-user-local-storage.service";
import {CurrentUserTokenLSServiceService} from "@service/current-user-token-lsservice/current-user-token-lsservice.service";
import {UsersStorageService} from "@service/users-storage/users-storage.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Сервис для работы с текущим пользователем
 */
export class UserService {

  user: IUser | null = null;

  private token: string | null;

  constructor(
    private currentUserLocalStorageService: CurrentUserLocalStorageService,
    private currentUserTokenLCService: CurrentUserTokenLSServiceService,
    private userStorageService: UsersStorageService
  ) {
  }

  setUser(user: IUser) {
    this.currentUserLocalStorageService.setCurrentUser(user);
  }

  getUser(): IUser | null {
    return this.currentUserLocalStorageService.getCurrentUser();
  }

  clear(): null {
    this.currentUserLocalStorageService.clearCurrentUser();
    this.currentUserTokenLCService.clearCurrentUserToken();
    this.token = null;
    return null;
  }

  setToken(token: string) {
    this.currentUserTokenLCService.setCurrentUserToken(token)
    this.token = token;
  }

  getToken(): string | null {
    const lsToken = this.currentUserTokenLCService.getCurrentUserToken();
    if (lsToken) {
      return lsToken;
    }

    return this.token
  }
}
