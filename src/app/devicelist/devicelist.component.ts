import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { Device } from '../device';
import { DeviceDataSource } from '../device-data-source';
import { TtnAccessService } from '../ttn-access.service';

@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.scss'],
})
export class DevicelistComponent implements OnInit {
  @Output()
  public selectedDeviceChange = new EventEmitter<Device>();

  public displayedColumns: string[] = ['id', 'name'];
  public dataSource$: Observable<DeviceDataSource | undefined>;

  public selectedDevice?: Device;

  constructor(
    ttnAccess: TtnAccessService,
    configurationService: AppConfigService
  ) {
    this.dataSource$ = configurationService.get().pipe(
      map((config) => {
        if (!config.applicationId) {
          return undefined;
        }

        const dataSource = new DeviceDataSource(
          ttnAccess,
          config.applicationId
        );
        dataSource.readPage(0, dataSource.pageSize);
        return dataSource;
      })
    );
  }

  public ngOnInit(): void {}

  public selectRow(row: Device): void {
    this.selectedDevice = this.selectedDevice === row ? undefined : row;
    this.selectedDeviceChange.emit(this.selectedDevice);
  }
}
