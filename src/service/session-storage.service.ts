import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storageSubject = new Subject<any>();

  getItem(key: string) : any | undefined {
    if(sessionStorage.getItem(key)){
      return JSON.parse(sessionStorage.getItem(key)!)
    }
    return undefined
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
    this.storageSubject.next({key, value});
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
    this.storageSubject.next({key});
  }

  getChanges(): Subject<any> {
    return this.storageSubject;
  }
}
