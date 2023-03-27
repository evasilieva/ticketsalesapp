import {Injectable} from '@angular/core';
import {TicketsRestService} from "../tickets-rest/tickets-rest.service";
import {map, Observable, Subject} from "rxjs";
import {INearestTour, ITour, ITourLocation, ITourTypeSelect} from "@models/tours";
import {IOrder} from "@models/order";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable();

  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();

  private orderUpdateSubject = new Subject<IOrder[]>();
  readonly orderUpdateSubject$ = this.orderUpdateSubject.asObservable();


  constructor(private ticketsRestService: TicketsRestService) {
  }

  updateTicketList(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
  }


  /**
   * Получение списка туров
   */
  getTickets(): Observable<ITour[]> {
    return this.ticketsRestService.getTours()
      .pipe(map(
        (val) => {
          const singleTour = val.filter((el) => el.type == 'single');
          return val.concat(singleTour);
        }
      ));
  }

  searchTicketsByName(name: string): Observable<ITour[]> {
    return this.ticketsRestService.getToursByName(name);
  }

  getTicketById(id: string): Observable<ITour> {
    return this.ticketsRestService.getTourById(id);
  }

  createTour(data: any): Observable<ITour> {
    return this.ticketsRestService.createTour(data);
  }

  generateRandomTours(): Observable<any> {
    return this.ticketsRestService.generateRandomTours();
  }

  removeAllTours(): Observable<any> {
    return this.ticketsRestService.removeAllTours();
  }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  getError(): Observable<any> {
    return this.ticketsRestService.getRestError();
  }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  /**
   * Получение ближайших туров
   */
  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketsRestService.getNearestTours();
  }

  /**
   * Получение списка локаций
   */
  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketsRestService.getLocationList();
  }

  /**
   * Получение случайного тура
   * @param type
   */
  getRandomNearestTour(type: number): Observable<INearestTour> {
    return this.ticketsRestService.getRandomNearestTour(type);
  }

  /**
   * Отправка данных о туре
   * @param data
   */
  sendTourData(data: IOrder): Observable<any> {
    return this.ticketsRestService.sendTourData(data);
  }

  getUserOrders(): Observable<IOrder[]> {
    return this.ticketsRestService.getUserOrders();
  }

  updateUserOrders(data: IOrder[]) {
    this.orderUpdateSubject.next(data);
  }
}
