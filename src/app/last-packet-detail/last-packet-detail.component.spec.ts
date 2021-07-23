import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPacketDetailComponent } from './last-packet-detail.component';

describe('LastPacketDetailComponent', () => {
  let component: LastPacketDetailComponent;
  let fixture: ComponentFixture<LastPacketDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastPacketDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastPacketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
