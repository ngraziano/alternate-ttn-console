import { MACParameters } from './mac-parameters';
import { UplinkMessage } from './uplink-message';

export enum PowerState {
  unknown = 'POWER_UNKNOWN',
  battery = 'POWER_BATTERY',
  external = 'POWER_EXTERNAL',
}

// naming depend of TTN API
/* eslint-disable @typescript-eslint/naming-convention */
export interface EndDevice {
  ids: {
    device_id: string;
    application_ids: {
      application_id: string;
    };
  };
  name: string;
  description: string;
  mac_state: {
    current_parameters: MACParameters;
    desired_parameters: MACParameters;
    recent_uplinks: UplinkMessage[];
    recent_downlinks: any;
    last_confirmed_downlink_at: string;
    last_dev_status_f_cnt_up: number;
    rx_windows_available: boolean;
    last_downlink_at: string;
    last_adr_change_f_cnt_up: number;
  };
  last_dev_status_received_at: string;
  power_state: PowerState;
  // between 0 and 1
  battery_percentage: number;
  downlink_margin: number;
}
