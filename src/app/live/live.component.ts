import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit {
  public allmessages: any[] = [];

  constructor(private eventService: EventsService) {
    eventService
      .getEvents()
      .subscribe((message) => this.allmessages.push(message));
  }

  ngOnInit(): void {}
}
