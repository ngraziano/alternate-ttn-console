import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DevicesComponent } from './devices/devices.component';
import { IsConfigurateGard } from './gard/is-configurate.gard';

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [IsConfigurateGard],
  },
  { path: 'config', component: ConfigurationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
