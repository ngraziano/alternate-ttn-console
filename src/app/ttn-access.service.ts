import { map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndDevices } from './ttnmodels/end-devices';
import { DeviceList } from './deviceList';
import { Observable } from 'rxjs';
import { DeviceNetworkInformation } from './device-network-information';
import { AppConfigService } from './app-config.service';
import { IAppConfiguration } from './database/app-configuration';
import { EndDevice } from './ttnmodels/end-device';

const totalCountHeader = 'x-total-count';

@Injectable({
  providedIn: 'root',
})
export class TtnAccessService {
  private readonly appserver = 'https://eu1.cloud.thethings.network';

  constructor(
    private client: HttpClient,
    private configService: AppConfigService
  ) {}

  // /api/v3/applications/{end_device.ids.application_ids.application_id}/devices/{end_device.ids.device_id}
  /*
ids (with subfields)
name
description
attributes
version_ids (with subfields)
network_server_address
application_server_address
join_server_address (only for OTAA devices)
service_profile_id
locations
picture
*/

  public endDeviceRegistryList(
    applicationId: string,
    page: number,
    limit: number
  ): Observable<DeviceList> {
    const url =
      this.appserver + `/api/v3/applications/${applicationId}/devices`;

    const params = new HttpParams()
      .set('page', (page + 1).toString())
      .set('limit', limit.toString())
      .set('field_mask', 'name,description');

    return this.configService.get().pipe(
      mergeMap((config) => {
        const headers = this.defaultHeaders(config);
        return this.client
          .get<EndDevices>(url, {
            headers,
            params,
            observe: 'response',
            responseType: 'json',
          })
          .pipe(
            map((res) => {
              const totalCntStr = res.headers.get(totalCountHeader);
              const totalCount = totalCntStr ? parseInt(totalCntStr, 10) : 0;
              return {
                total: totalCount,
                devices: res.body?.end_devices.map((d) => ({
                  appId: d.ids.application_ids.application_id,
                  id: d.ids.device_id,
                  name: d.name,
                })),
              } as DeviceList;
            })
          );
      })
    );
  }
  // /api/v3/ns/applications/{end_device_ids.application_ids.application_id}/devices/{end_device_ids.device_id}
  /*
ids (with subfields)
frequency_plan_id
lorawan_phy_version
lorawan_version
mac_settings (with subfields)
mac_state (with subfields)
supports_join
multicast
supports_class_b
supports_class_c
session.dev_addr
session.keys:
session_key_id
f_nwk_s_int_key
s_nwk_s_int_key
nwk_s_enc_key

  */

  public nsEndDeviceRegistryGet(
    applicationId: string,
    endDeviceId: string
  ): Observable<EndDevice> {
    return this.configService.get().pipe(
      mergeMap((config) => {
        const url =
          this.appserver +
          `/api/v3/ns/applications/${applicationId}/devices/${endDeviceId}`;

        const headers = this.defaultHeaders(config);

        const params = new HttpParams().set(
          'field_mask',
          'frequency_plan_id,mac_state,power_state,last_dev_status_received_at,battery_percentage,downlink_margin'
        );

        return this.client.get<EndDevice>(url, {
          headers,
          params,
          observe: 'body',
          responseType: 'json',
        });
      })
    );
  }

  private defaultHeaders(config: IAppConfiguration): HttpHeaders {
    if (!config.ttnUserToken) {
      throw new Error('Missing authentication');
    }
    return new HttpHeaders().set(
      'authorization',
      'Bearer ' + config.ttnUserToken
    );
  }
}
