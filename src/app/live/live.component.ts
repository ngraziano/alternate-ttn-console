import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit {
  public allmessages: Observable<any[]>;

  constructor(private eventService: EventsService) {
    this.allmessages = eventService.getEvents().pipe(
      scan((messagelist, newmessage) => {
        // limit number of message to 1000
        messagelist.splice(0, messagelist.length - 1000, newmessage);

        return messagelist;
      }, [] as any[])
    );
  }

  ngOnInit(): void {}
}
