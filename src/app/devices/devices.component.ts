import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { convertToNetworkInformation } from '../convert-network-device';
import { Device } from '../device';
import { DeviceNetworkInformation } from '../device-network-information';
import { TtnAccessService } from '../ttn-access.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  public readonly selectedDevice = new BehaviorSubject<Device | undefined>(
    undefined
  );

  public readonly selectedDeviceNetworkInformation: Observable<
    { loading: boolean; value?: DeviceNetworkInformation } | undefined
  >;

  constructor(private ttnAccess: TtnAccessService) {
    this.selectedDeviceNetworkInformation = this.selectedDevice.pipe(
      mergeMap((d) => this.readNetworkInformation(d))
    );
  }

  ngOnInit(): void {}

  public onSelectedDeviceChange(newDevice: Device): void {
    this.selectedDevice.next(newDevice);
  }

  private readNetworkInformation(
    device: Device | undefined
  ): Observable<
    { loading: boolean; value?: DeviceNetworkInformation } | undefined
  > {
    if (!device) {
      return of(undefined);
    }

    return this.ttnAccess.nsEndDeviceRegistryGet(device.appId, device.id).pipe(
      map((obj) => ({
        loading: false,
        value: convertToNetworkInformation(obj),
      })),
      startWith({ loading: true })
    );
  }
}
