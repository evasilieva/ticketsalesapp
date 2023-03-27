import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Сервис для работы с локальным хранилищем
 */
export class LocalStorageService {

  constructor() {
  }

  /**
   * Сохранение данных в локальное хранилище
   * @param key
   * @param value
   */
  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * Получение данных из локального хранилища
   * @param key
   */
  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Удаление данных  в локальном хранилище
   * @param key
   */
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Очистка локального хранилища
   */
  public clear() {
    localStorage.clear();
  }
}
