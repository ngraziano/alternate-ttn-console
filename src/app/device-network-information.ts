import { DesiredActual } from './desired-actual';

export interface DeviceNetworkInformation {
  id: string;
  dataRate: DesiredActual<number>;
  txPowerIndex: DesiredActual<number>;
  txPower: DesiredActual<number>;
  statusUpdateTime: Date;
  powerSource: number;
  batteryPercentage: number;
  downlinkMargin: number;
  uplinkDate: Date;
  uplinkMarging: number;
  lastPacket?: {
    date: Date;
    type: string;
    frequency: string;
    frameCounter: number;
    port: number;
    channel: number;
    sp: number;
    airtime: string;
  };
  raw: any;
}
