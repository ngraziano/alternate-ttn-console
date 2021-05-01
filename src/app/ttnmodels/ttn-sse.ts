/**
 * SSE for TTN
 * Based on work of Petazzoni <maxime.petazzoni@bulix.org> : https://github.com/mpetazzoni/sse.js
 * All rights reserved.
 */

import { Subject } from 'rxjs';

export interface TtnSSEOptions {
  headers?: { [idx: string]: string };
  payload?: string;
  method?: string;
  withCredentials?: boolean;
}

enum TtnSSEState {
  initializing = -1,
  connecting = 0,
  open = 1,
  closed = 2,
}

export class TtnSSE {
  private dataInternal = new Subject<string>();

  private headers: { [idx: string]: string };
  private payload: string;
  private method: string;
  private withCredentials: boolean;
  private xhr: XMLHttpRequest | null = null;
  private progress = 0;
  private chunk = '';
  private readyState: TtnSSEState = TtnSSEState.initializing;

  constructor(public url: string, options: TtnSSEOptions) {
    this.headers = options.headers || {};
    this.payload = options.payload !== undefined ? options.payload : '';
    this.method = options.method || (this.payload && 'POST') || 'GET';
    this.withCredentials = !!options.withCredentials;
  }

  public get data() {
    return this.dataInternal.asObservable();
  }

  public stream() {
    this.setReadyState(TtnSSEState.connecting);

    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener('progress', this.onStreamProgress.bind(this));
    this.xhr.addEventListener('load', this.onStreamLoaded.bind(this));
    this.xhr.addEventListener(
      'readystatechange',
      this.checkStreamClosed.bind(this)
    );
    this.xhr.addEventListener('error', this.onStreamFailure.bind(this));
    this.xhr.addEventListener('abort', this.onStreamFailure.bind(this));
    this.xhr.open(this.method, this.url);
    for (const header in this.headers) {
      if (Object.prototype.hasOwnProperty.call(this.headers, header)) {
        this.xhr.setRequestHeader(header, this.headers[header]);
      }
    }
    this.xhr.withCredentials = this.withCredentials;
    this.xhr.send(this.payload);
  }

  private setReadyState(state: TtnSSEState) {
    this.readyState = state;
  }

  private onStreamProgress(e: ProgressEvent) {
    if (!this.xhr) {
      return;
    }

    if (this.xhr.status !== 200) {
      this.onStreamFailure(e);
      return;
    }

    if (this.readyState === TtnSSEState.connecting) {
      // this.dispatchEvent(new CustomEvent('open'));
      this.setReadyState(TtnSSEState.open);
    }

    const data = this.xhr.responseText.substring(this.progress);
    this.progress += data.length;
    data.split(/(\r\n|\r|\n){2}/g).forEach((part) => {
      if (part.trim().length === 0) {
        this.dataInternal.next(this.chunk.trim());
        this.chunk = '';
      } else {
        this.chunk += part;
      }
    });
  }

  private onStreamFailure(e: ProgressEvent) {
    this.close();
  }

  private onStreamLoaded(e: ProgressEvent) {
    this.onStreamProgress(e);

    // Parse the last chunk.
    this.dataInternal.next(this.chunk);
    this.chunk = '';
  }

  private checkStreamClosed() {
    if (!this.xhr) {
      return;
    }

    if (this.xhr.readyState === XMLHttpRequest.DONE) {
      this.dataInternal.complete();
      this.setReadyState(TtnSSEState.closed);
    }
  }

  private close() {
    if (this.readyState === TtnSSEState.closed) {
      return;
    }

    this.xhr?.abort();
    this.xhr = null;
    this.dataInternal.complete();
    this.setReadyState(TtnSSEState.closed);
  }
}
