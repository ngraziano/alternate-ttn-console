import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';
// naming depend of TTN API
/* eslint-disable @typescript-eslint/naming-convention */

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private configService: AppConfigService) {}

  public getEvents(): Observable<any> {
    const abortController = new AbortController();

    return this.configService.get().pipe(
      mergeMap((config) =>
        from(
          fetch(config.serverUrl + '/api/v3/events', {
            body: JSON.stringify({
              identifiers: [
                {
                  application_ids: { application_id: config.applicationId },
                },
              ],
            }),
            method: 'POST',
            signal: abortController.signal,
            headers: {
              Authorization: 'Bearer ' + config.ttnUserToken,
              Accept: 'text/event-stream',
            },
          })
        )
      ),
      mergeMap((response) => {
        if (!response.ok) {
          return throwError(new Error('Fail to read events'));
        }
        return new Observable<string>((sub) => {
          const reader = response.body?.getReader();
          if (!reader) {
            sub.error(new Error('Fail to read events'));
            return;
          }
          const utf8decoder = new TextDecoder();
          let buffer = '';
          const onChunk = (res: { done: boolean; value?: Uint8Array }) => {
            if (res.done) {
              if (buffer) {
                sub.next(buffer);
              }
              sub.complete();
              return;
            }
            const parsed = utf8decoder.decode(res.value);
            buffer += parsed;
            const lines = buffer.split(/\n\n/);
            buffer = lines.pop() as string;
            for (const line of lines) {
              sub.next(line);
            }

            reader.read().then(onChunk);
          };
          reader
            .read()
            .then(onChunk)
            .catch((e) => sub.error(e));
          return {
            unsubscribe: () => abortController.abort(),
          };
        });
      }),
      map((message) => JSON.parse(message).result)
    );
  }
}
