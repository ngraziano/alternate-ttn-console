import { Component, Input, OnInit } from '@angular/core';
import { DeviceNetworkInformation } from '../device-network-information';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss'],
})
export class DeviceDetailComponent implements OnInit {
  @Input()
  public device?: DeviceNetworkInformation;

  constructor() {}

  ngOnInit(): void {}
}
