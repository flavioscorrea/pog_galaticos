
export interface Devices {
   deviceCode: string;
   deviceDescription: string;
   count: string;
}

export interface DevicesIntegration {
   devices: Array<DeviceCode>;
}

export interface DeviceCode {
   deviceCode: string;
}

export interface TotalDevices {
   totalDevices: number;
   total: number;
   hasNext: boolean;
   items: Array<Devices>;
}
