export interface PacketInformation {
  date: Date;
  type: string;
  frequency: string;
  frameCounter: number;
  port: number;
  channel: number;
  sp: number;
  airtime: string;
}
