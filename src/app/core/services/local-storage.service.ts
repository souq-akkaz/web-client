import { Injectable } from '@angular/core';
import { path } from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key: string) {
    let firstKey: string | null = null;
    if (key.includes('.')) {
      [firstKey] = key.split('.');
    }
    const rootObject = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : null;
    if (firstKey && rootObject) {
      return path(key.split('.'), rootObject);
    }
    return rootObject;
  }
}
