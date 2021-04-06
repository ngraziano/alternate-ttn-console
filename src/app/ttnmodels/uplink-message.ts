// naming depend of TTN API

import { RxMetaData } from './rx-metadata';

/* eslint-disable @typescript-eslint/naming-convention */
export interface UplinkMessage {
  payload: any;
  settings: any;
  rx_metadata: RxMetaData[];
  received_at: string;
  consumed_airtime: string;
}
