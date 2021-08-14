import { Injectable } from '@angular/core';
import * as R from 'ramda';
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

    let rootObject: { [key: string]: any } | null = null;
    if (firstKey != null) {
      rootObject = localStorage.getItem(firstKey) ? JSON.parse(localStorage.getItem(firstKey) as string) : null;
    } else {
      rootObject = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : null;
    }
    if (firstKey && rootObject) {
      const keysFromSecondLevel = R.pipe(R.split('.'), R.drop(1))(key);
      const value = path(keysFromSecondLevel, rootObject);
      return value;
    }
    return rootObject;
  }
}
