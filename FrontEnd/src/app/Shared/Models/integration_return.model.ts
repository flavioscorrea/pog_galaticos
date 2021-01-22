
export interface IntegrationReturn {
   devices: Array<IntegrationReturnItem>;
}

export interface IntegrationReturnItem {
   deviceCode: string;
   message: string;
   status: string;
}
