import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  private _myBehavioralSubject = new BehaviorSubject<string>('init string in b s');
  private _mySubject = new Subject<string>();
  private _myObservable = new Observable<string>((subscriber => {
    setTimeout(() => {
      subscriber.next('async');
    }, 3000)
  }))


  constructor() {
  }

  initObservable(): void {
    // this._mySubject.next("my subject next")
    // this._myBehavioralSubject.next('_myBehavioralSubject next')
    // const observable = new Observable((subscriber => {
    //   subscriber.next(4);
    //   subscriber.next(5);
    //   setTimeout(()=>{
    //     subscriber.next('async');
    //     subscriber.error('err');
    //   })
    //
    // }))
    //
    // observable.subscribe((data) => {
    //   console.log('observable data', data)
    // })
  }


  getBehavioralSubject(): BehaviorSubject<string> {
    return this._myBehavioralSubject;
  }

  getSubject(): Subject<string> {
    return this._mySubject;
  }

  getObservable(): Observable<string> {
    return this._myObservable;
  }
}
