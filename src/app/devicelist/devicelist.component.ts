import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.scss'],
})
export class DevicelistComponent implements OnInit {
  public displayedColumns: string[] = ['name'];
  public dataSource: DataSource<Device>;
  constructor() {}

  ngOnInit(): void {}
}
