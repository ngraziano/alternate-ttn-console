import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { IAppConfiguration } from './database/app-configuration';
import { LocalDatabase } from './database/local-database';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private defaultConfig: IAppConfiguration = {
    id: 0,
    ttnUserToken: undefined,
  };

  private current = new Subject<IAppConfiguration>();
  private lastConfig = this.current.pipe(publishReplay(1), refCount());

  constructor(private database: LocalDatabase) {
    this.database.appConfiguration.get(0).then(async (val) => {
      if (!val) {
        // define default value
        await this.database.appConfiguration.add(this.defaultConfig);
        this.current.next(this.defaultConfig);
      } else {
        this.current.next(val);
      }
    });
  }

  public get(): Observable<IAppConfiguration> {
    return this.lastConfig;
  }

  public save(newValue: IAppConfiguration): void {
    newValue.id = 0;
    this.database.appConfiguration
      .put(newValue)
      .then(() => this.current.next(newValue));
  }
}
