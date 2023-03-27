import {Injectable} from '@angular/core';
import {LocalStorageService} from "../locat-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserTokenLSServiceService {

  constructor(private localStorageService: LocalStorageService) {
  }

  private getStorageCurrentUserTokenKey(): string {
    return "current_user_token";
  }

  setCurrentUserToken(token: string) {
    this.localStorageService
      .setItem(
        this.getStorageCurrentUserTokenKey(),
        token
      );
  }

  getCurrentUserToken(): string | null {
    const item = this.localStorageService
      .getItem(
        this.getStorageCurrentUserTokenKey()
      );
    if (!item) {
      return null;
    }
    return item;
  }

  clearCurrentUserToken() {
    this.localStorageService
      .removeItem(
        this.getStorageCurrentUserTokenKey()
      );
  }
}
