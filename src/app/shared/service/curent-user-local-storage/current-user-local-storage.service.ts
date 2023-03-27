import {Injectable} from '@angular/core';
import {IUser} from "@models/users";
import {LocalStorageService} from "../locat-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Сервис, который сохраняет в localStorage текущего пользователя
 */
export class CurrentUserLocalStorageService {

  constructor(private localStorageService: LocalStorageService) {
  }

  private getStorageCurrentUserKey(): string {
    return "current_user";
  }

  setCurrentUser(user: IUser) {
    const userData = JSON.stringify(user);
    this.localStorageService.setItem(
      this.getStorageCurrentUserKey(),
      userData
    );
  }

  getCurrentUser(): IUser | null {
    const item = this.localStorageService.getItem(
      this.getStorageCurrentUserKey()
    );
    if (!item) {
      return null;
    }
    return JSON.parse(item);
  }

  clearCurrentUser() {
    this.localStorageService.removeItem(
      this.getStorageCurrentUserKey()
    );
  }
}
