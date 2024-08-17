declare interface IScannerAttributes {
  UUID: ArrayBuffer;

  adminurl: ArrayBuffer;

  cs: ArrayBuffer;

  duplex: ArrayBuffer;

  is: ArrayBuffer;

  "mopria-certified-scan": ArrayBuffer;

  pdl: ArrayBuffer;

  representation: ArrayBuffer;

  rs: ArrayBuffer;

  txtvers: ArrayBuffer;

  ty: ArrayBuffer;

  vers: ArrayBuffer;
}

declare interface OnLocalServiceFoundCallbackResult {
  attributes: IScannerAttributes
}

declare interface ISupportedScanSetting {
  Version: number,
  Intent: string,
  ScanRegions: string,
  ScanRegion: string,
  Height: number,
  Width: number,
  XOffset: number,
  YOffset: number,
  InputSource: TOrigin,
  XResolution: string,
  YResolution: string,
  ColorMode: string,
  Brightness: string,
  Contrast: string,
  CompressionFactor: string,
  DocumentFormatExt: TDocumentFormatMimitype,
  DocumentFormat: TDocumentFormatMimitype,
  Resolution: number,
  ScanDestinations: TScanDestinations,
  Duplex?: boolean,
}

declare interface IScanSettingParams {
  Version?: number,                             //escl version
  ScanRegions?: TScanRegion                          // paper size
  InputSource?: TOrigin,                        // scan source
  ColorMode?: string,                           // color mode
  Brightness?: string,                          // brightness
  Contrast?: string,                            // Contrast
  CompressionFactor?: string,                   // CompressionFactor
  DocumentFormat?: TDocumentFormatMimitype,     // DocumentFormat
  Resolution?: number,
  ScanDestinations?: TScanDestinations,
  Duplex?: boolean,
}