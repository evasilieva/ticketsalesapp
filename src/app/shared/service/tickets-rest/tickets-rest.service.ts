import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INearestTour, ITour, ITourLocation} from "@models/tours";
import {Observable} from "rxjs";
import {IOrder} from "@models/order";

@Injectable({
  providedIn: 'root'
})
/**
 * Сервис для работы с турами по rest api
 */
export class TicketsRestService {

  private baseUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) {
  }

  createTour(data: any): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + 'tour-item', data, {headers: {}});
  }

  getTours(): Observable<ITour[]> {
    return this.http
      .get<ITour[]>(this.baseUrl + 'tours')
  }

  getToursByName(name: string): Observable<ITour[]> {
    return this.http
      .get<ITour[]>(this.baseUrl + 'tour-item/?name=' + name)
  }

  getTourById(id: string): Observable<ITour> {
    return this.http
      .get<ITour>(this.baseUrl + 'tours/' + id)
  }

  removeAllTours(): Observable<any> {
    console.log('here')
    return this.http.delete(this.baseUrl + 'tours/remove');
  }

  generateRandomTours(): Observable<any> {
    return this.http.post(this.baseUrl + 'tours', {});
  }

  getRestError(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + 'tours/notFound');
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.http
      .get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours');
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http
      .get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location');
  }

  getRandomNearestTour(type: number): Observable<INearestTour> {
    switch (type) {
      case 0:
        return this.http.get<INearestTour>('/assets/mocks/nearest_tours_1.json');
      case 1:
        return this.http.get<INearestTour>('/assets/mocks/nearest_tours_2.json');
      case 2:
        return this.http.get<INearestTour>('/assets/mocks/nearest_tours_3.json');
      default:
        return this.http.get<INearestTour>('/assets/mocks/nearest_tours_1.json');
    }
  }

  sendTourData(data: IOrder): Observable<any> {
    return this.http
      .post<IOrder>(this.baseUrl + 'orders', data);
  }

  getUserOrders(): Observable<IOrder[]> {
    return this.http
      .get<IOrder[]>(this.baseUrl + 'orders');
  }
}
