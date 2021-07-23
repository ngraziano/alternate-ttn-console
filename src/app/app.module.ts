import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevicelistComponent } from './devicelist/devicelist.component';
import { DevicesComponent } from './devices/devices.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ActualVsDesiredComponent } from './actual-vs-desired/actual-vs-desired.component';
import { PowerSourcePipe } from './device-detail/power-source.pipe';
import { LiveComponent } from './live/live.component';
import { LastPacketDetailComponent } from './last-packet-detail/last-packet-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DevicelistComponent,
    DevicesComponent,
    DeviceDetailComponent,
    ConfigurationComponent,
    ActualVsDesiredComponent,
    PowerSourcePipe,
    LiveComponent,
    LastPacketDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
