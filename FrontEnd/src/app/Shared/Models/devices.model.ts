
export interface Devices {
   deviceCode: string;
   deviceDescription: string;
   count: string;
  }

  export interface Devices_integration {
   devices: Array<device_code>;
  }

  export interface device_code {
   deviceCode: string;
  }

  export interface Total_Devices {
   totalDevices: number;
   total: number;
  }