import {Injectable} from '@angular/core';
import {StatisticRestService} from "../statistic-rest/statistic-rest.service";
import {ICustomStatisticUser, IStatisticUser} from "@models/statistic";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
    private statisticRestService: StatisticRestService,
  ) {
  }

  getStatistic(): Observable<ICustomStatisticUser[]> {
    return this.statisticRestService
      .getStatistic()
      .pipe(
        map(this.convertStatisticToCustomStatistic)
      );
  }

  /**
   * Конвертируем массив IStatisticUser в массив ICustomStatisticUser
   * @param data
   * @private
   */
  private convertStatisticToCustomStatistic(data: IStatisticUser[]): ICustomStatisticUser[] {
    const newData: ICustomStatisticUser[] = [];
    data.forEach((el: IStatisticUser) => {
      const newEl: ICustomStatisticUser = {
        id: el.id,
        name: el.name,
        company: el.company.name,
        phone: el.phone,
        city: el.address.city,
        street: el.address.street,
      };
      newData.push(newEl);
    });

    return newData;
  }
}
