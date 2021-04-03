import { Component, Input, OnInit } from '@angular/core';
import { DesiredActual } from '../desired-actual';

@Component({
  selector: 'app-actual-vs-desired',
  templateUrl: './actual-vs-desired.component.html',
  styleUrls: ['./actual-vs-desired.component.scss'],
})
export class ActualVsDesiredComponent implements OnInit {
  @Input()
  public label?: string;

  @Input()
  public value?: DesiredActual<any>;

  @Input()
  public unit?: string;

  constructor() {}

  ngOnInit(): void {}

  public get wantedLabel(): string {
    return `Wanted value ${this.value?.desired} ${this.unit ?? ''}`;
  }

  public get isWantedDiff(): boolean {
    return this.value?.actual !== this.value?.desired;
  }
}
