import { CollectionViewer, ListRange } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Device } from './device';
import { TtnAccessService } from './ttn-access.service';

export class DeviceDataSource extends DataSource<Device> {
  public pageSize = 5;
  public totalNumberOfDevice = new BehaviorSubject<number>(0);
  private deviceSubject = new BehaviorSubject<Device[]>([]);

  constructor(private ttnAccess: TtnAccessService, private appId: string) {
    super();
  }

  public connect(): Observable<Device[]> {
    return this.deviceSubject.asObservable();
  }
  public disconnect(): void {
    this.deviceSubject.complete();
  }

  public readPage(page: number, pageSize: number): void {
    this.pageSize = pageSize;
    this.ttnAccess
      .endDeviceRegistryList(this.appId, page, this.pageSize)
      .subscribe({
        next: (devicelist) => {
          this.deviceSubject.next(devicelist.devices);
          this.totalNumberOfDevice.next(devicelist.total);
        },
      });
  }
}
