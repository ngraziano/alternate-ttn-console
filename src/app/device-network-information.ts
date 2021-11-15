import { DesiredActual } from './desired-actual';
import { PacketInformation } from './packet-information';
import { PowerState } from './ttnmodels/end-device';

export interface DeviceNetworkInformation {
  id: string;
  dataRate: DesiredActual<number>;
  txPowerIndex: DesiredActual<number>;
  txPower: DesiredActual<number>;
  statusUpdateTime: Date;
  powerSource: PowerState;
  batteryPercentage: number;
  downlinkMargin: number;
  uplinkDate: Date;
  uplinkMarging: number;
  lastPacket?: PacketInformation;
  raw: any;
}
