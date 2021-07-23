import { Component, Input, OnInit } from '@angular/core';
import { PacketInformation } from '../packet-information';

@Component({
  selector: 'app-last-packet-detail',
  templateUrl: './last-packet-detail.component.html',
  styleUrls: ['./last-packet-detail.component.scss'],
})
export class LastPacketDetailComponent implements OnInit {
  @Input()
  public packetInformation?: PacketInformation;

  constructor() {}

  ngOnInit(): void {}
}
