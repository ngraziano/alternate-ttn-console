import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public dataSource: DeviceDataSource;

  public selectedDevice?: Device;

  constructor(ttnAccess: TtnAccessService) {
    this.dataSource = new DeviceDataSource(ttnAccess);
    this.dataSource.readPage(1, this.dataSource.pageSize);
  }

  public ngOnInit(): void {}

  public selectRow(row: Device): void {
    this.selectedDevice = this.selectedDevice === row ? undefined : row;
    this.selectedDeviceChange.emit(this.selectedDevice);
  }
}
