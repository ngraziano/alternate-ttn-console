// naming depend of TTN API

import { RxMetaData } from './rx-metadata';

/* eslint-disable @typescript-eslint/naming-convention */
export interface UplinkMessage {
  payload: any;
  settings: {
    frequency: string;
    data_rate: any;
  };
  rx_metadata: RxMetaData[];
  received_at: string;
  device_channel_index: number;
  consumed_airtime: string;
}
