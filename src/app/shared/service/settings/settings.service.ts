import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ISettings} from "@models/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject: Subject<ISettings> = new Subject<ISettings>();

  constructor() {
  }

  /**
   * Получение настроек пользователя
   */
  loadUserSettings(): Observable<ISettings> {
    return new Observable<ISettings>((subscriber) => {
      const settingsData: ISettings = {
        saveToken: true
      }
      subscriber.next(settingsData);
    });
  }

  /**
   * Обновление настроек пользователя
   * @param data
   */
  loadUserSettingsSubject(data: ISettings): any {
    this.settingsSubject.next(data);
  }

  /**
   * Получение настроек пользователя
   */
  getSettingsSubjectObservable(): Observable<ISettings> {
    return this.settingsSubject.asObservable();
  }

}
