import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IConfig} from "../../models/config";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public static config: IConfig | null;

  constructor(private http: HttpClient) {
  }

  /**
   * Получение конфига из файла
   * @private
   */
  private httpGetJsonFile(): Observable<any> {
    const jsonFile = `assets/config/config.json`;
    return this.http.get<IConfig >(jsonFile);
  }

  /**
   * Загрузка конфига
   */
  configLoad(): void {
    this.httpGetJsonFile()
      .subscribe((data) => {
        console.log('====');
        if (data && typeof (data) === 'object') {
          ConfigService.config = data as IConfig;
          console.log(ConfigService.config)
        }
        console.log('====');
      });
  }

  loadPromise(): Promise<any> {
    const jsonFile = `assets/config/config.json`;
    const configPromise = new Promise<IConfig>((resolve, reject) => {
      this.httpGetJsonFile()
        .toPromise()
        .then((response: any) => {
          if (response && typeof (response) === 'object') {
            ConfigService.config = response;
            const config = ConfigService.config;
            if (config) {
              // set origin host
              resolve(config);
            } else {
              reject('Ошибка при инициализации конфига - неверный формат ' + config);
            }
          } else {
            reject('Ошибка при инициализации конфига - неверный формат ответа ' + response);
          }
        })
        .catch((response: any) => {
          reject(`Ошибка при загрузки файла '${jsonFile}': ${JSON.stringify(response)}`);
        });
    });

    const promiseArr = [configPromise];
    return Promise.all(promiseArr);
  }
}
