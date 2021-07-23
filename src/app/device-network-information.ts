import { DesiredActual } from './desired-actual';
import { PacketInformation } from './packet-information';

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
  lastPacket?: PacketInformation;
  raw: any;
}
