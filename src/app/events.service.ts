import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';
import { TtnSSE } from './ttnmodels/ttn-sse';
// naming depend of TTN API
/* eslint-disable @typescript-eslint/naming-convention */

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private configService: AppConfigService) {}

  public getEvents(): Observable<any> {
    return this.configService.get().pipe(
      mergeMap(
        (config) =>
          new Observable((s) => {
            const sse = new TtnSSE(
              'https://eu1.cloud.thethings.network/api/v3/events',
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + config.ttnUserToken,
                  accept: 'text/event-stream',
                },
                payload: JSON.stringify({
                  identifiers: [
                    {
                      application_ids: { application_id: config.applicationId },
                    },
                  ],
                }),
                method: 'POST',
              }
            );
            sse.stream();
            sse.data.subscribe(
              (jsontext) => {
                if (jsontext) {
                  s.next(JSON.parse(jsontext));
                }
              },
              (er) => s.error(er),
              () => s.complete()
            );
          })
      )
    );
  }
}
