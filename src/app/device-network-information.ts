import { DesiredActual } from './desired-actual';

export interface DeviceNetworkInformation {
  id: string;
  dataRate: DesiredActual<number>;
  txPowerIndex: DesiredActual<number>;
  txPower: DesiredActual<number>;

  raw: any;
}
