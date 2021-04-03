import { DesiredActual } from './desired-actual';

export interface DeviceNetworkInformation {
  id: string;
  dataRate: DesiredActual<number>;
  txPowerIndex: DesiredActual<number>;
  txPower: DesiredActual<number>;
  statusUpdateTime: Date;
  powerSource: string;
  batteryPercentage: number;
  raw: any;
}
