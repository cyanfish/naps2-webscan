


declare type TColorMode = "BlackAndWhite1" | "Grayscale8" | "RGB24"
declare interface IScanSettingColorMode {
  name: 'ColorMode',
  default_value: TColorMode,
  options: TColorMode[],
}

declare interface IScanSettingDocumentFormat {
  name: 'DocumentFormat',
  default_value: TDocumentFormatMimitype,
  options: TDocumentFormatMimitype[],
}

declare type TScanRegion = 'A4' | '5x7 in.' | '4x6 in.' | 'Letter' | '10x15 cm'
declare interface IScanSettingScanRegion {
  name: 'ScanRegions',
  default_value: TScanRegion,
  options: TScanRegion[],
}


declare type TResolution = 'Screen 75dpi' | 'Photo 200dpi' | 'Text 300dpi' | 'Height 600dpi'
declare type TResolutions = {
  label: TResolution,
  xResolution: number,
  yResolution: number
}
declare interface IScanSettingResolution {
  name: 'Resolution',
  default_value: number,
  options: number[],
}

declare type TOrigin = 'ADF' | 'Glass';

declare interface IScanSettingOrigin {
  name: 'Origin',
  default_value: TOrigin,
  options: TOrigin[],
}

declare type TDuplex = 'Simplex' | 'Duplex';
declare interface IDuplex {
  name: 'Duplex',
  default_value: TDuplex,
  options: TDuplex[],
}

declare type TBrightnessSupport = {
  Max: number,
  Min: number,
  Step: number,
  Normal: number,
}

declare type TPaperPageSize = {
  label: TScanRegion,
  Height: number,
  Width: number,
  XOffset: number,
  YOffset: number
}

declare type TScanSettingItem = IScanSettingOrigin | IScanSettingScanRegion | IScanSettingColorMode | IScanSettingResolution | IScanSettingDocumentFormat | IDuplex;
declare type TAdfOption = 'DetectPaperLoaded' | 'SelectSinglePage' | 'Duplex';
declare type TADFScanSetting = {
  Simplex: TScanSettingItem[],
  Duplex: TScanSettingItem[] | null,
  AdfOptions: TAdfOption[] | TAdfOption,
  FeederCapacity: number,
};
declare type TScanSetting = {
  adf: TADFScanSetting,
  platen: TScanSettingItem[]
}



declare type TRetryInfo = {
  NumberOfRetries: number,
  RetryInterval: number,
  RetryTimeOut: number,
}
declare type THttpHeader = string | string
declare interface THttpDestination extends Record<string, any> {
  DestinationUri: string,
  ReferenceID: string,
  RetryInfo: TRetryInfo,
  JobOriginatingUserName: string,
  JobPassword: string,
  HttpMethod: string,
  HttpHeaders: { HttpHeader: string | string[] },
  CertificateValidation: boolean
}
declare type TScanDestinations = THttpDestination | THttpDestination[]
