import {Injectable} from '@angular/core';
import {ITour} from "@models/tours";

@Injectable({
  providedIn: 'root'
})
/**
 * Сервис для работы с хранилищем туров
 */
export class TicketsStorageService {

  private tickets: ITour[] = [];

  constructor() {
  }

  setStorage(tickets: ITour[]) {
    this.tickets = tickets;
  }

  getStorage(): ITour[] {
    return this.tickets;
  }
}
