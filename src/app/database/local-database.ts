import Dexies from 'dexie';
import { Injectable } from '@angular/core';
import { IAppConfiguration } from './app-configuration';

@Injectable({
  providedIn: 'root',
})
export class LocalDatabase extends Dexies {
  public readonly appConfiguration: Dexie.Table<IAppConfiguration, number>;

  constructor() {
    super('ttn-console-aternative-db');

    this.version(1).stores({
      appConfiguration: 'id',
    });

    this.appConfiguration = this.table('appConfiguration');
  }
}
