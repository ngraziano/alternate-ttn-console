import { DeviceNetworkInformation } from './device-network-information';
import { EndDevice } from './ttnmodels/end-device';

export const convertToNetworkInformation = (obj: EndDevice) => {
  {
    const lastUplink = obj.mac_state.recent_uplinks
      ? obj.mac_state.recent_uplinks[obj.mac_state.recent_uplinks.length - 1]
      : null;
    const lastDownLink = obj.mac_state.recent_downlinks
      ? obj.mac_state.recent_downlinks[
          obj.mac_state.recent_downlinks.length - 1
        ]
      : null;
    const uplinkMargings = lastUplink?.rx_metadata.map((x) => x.rssi) ?? [];

    return {
      id: obj.ids.device_id as string,
      txPowerIndex: {
        desired: obj.mac_state.desired_parameters.adr_tx_power_index ?? 0,
        actual: obj.mac_state.current_parameters.adr_tx_power_index ?? 0,
      },
      txPower: {
        desired:
          (obj.mac_state.desired_parameters.max_eirp ?? 0) -
          2 * (obj.mac_state.desired_parameters.adr_tx_power_index ?? 0),
        actual:
          (obj.mac_state.current_parameters.max_eirp ?? 0) -
          2 * (obj.mac_state.current_parameters.adr_tx_power_index ?? 0),
      },
      dataRate: {
        desired: obj.mac_state.desired_parameters.adr_data_rate_index ?? 0,
        actual: obj.mac_state.current_parameters.adr_data_rate_index ?? 0,
      },
      statusUpdateTime: obj.last_dev_status_received_at
        ? new Date(obj.last_dev_status_received_at)
        : undefined,
      powerSource: obj.power_state ?? 0,
      batteryPercentage: obj.battery_percentage * 100,
      downlinkMargin: obj.downlink_margin,
      uplinkDate: lastUplink ? new Date(lastUplink.received_at) : undefined,
      uplinkMarging: Math.max(...uplinkMargings),
      lastPacket: lastUplink
        ? {
            date: new Date(lastUplink.received_at),
            airtime: lastUplink.consumed_airtime,
            channel: lastUplink.device_channel_index,
            frequency: lastUplink.settings.frequency,
            sp: lastUplink.settings.data_rate?.lora?.spreading_factor,
            type: lastUplink.payload?.m_hdr?.m_type,
            frameCounter: lastUplink?.payload?.mac_payload?.full_f_cnt,
            port: lastUplink?.payload?.mac_payload?.f_port,
          }
        : undefined,
      raw: obj,
    } as DeviceNetworkInformation;
  }
};
