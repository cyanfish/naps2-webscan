

declare type TContentTypes = "Photo" | "Text" | "TextAndPhoto"
declare type TDocumentFormatMimitype = "application/octet-stream" | "image/jpeg" | "application/pdf"
declare type TColorSpace = "YCC" | "RGB"
declare type TInoutSource = 'Feeder' | 'Platen'

declare type TSlider = {
  "scan:Min": number,
  "scan:Max": number,
  "scan:Normal": number,
  "scan:Step": number
}
declare type TDiscreteResolution = {
  "scan:XResolution": number,
  "scan:YResolution": number
}
declare type TSupportedIntents = "Document" | "Photo" | "Preview" | "TextAndGraphic"
declare type IInputCaps = {
  "scan:MinWidth": number,
  "scan:MaxWidth": number,
  "scan:MinHeight": number,
  "scan:MaxHeight": number,
  "scan:MinPageWidth": number,
  "scan:MinPageHeight": number,
  "scan:MaxScanRegions": number,
  "scan:SettingProfiles": {
    "scan:SettingProfile": {
      "scan:ColorModes": {
        "scan:ColorMode": TColorMode[]
      },
      "scan:ContentTypes": {
        "pwg:ContentType": TContentTypes[]
      },
      "scan:DocumentFormats": {
        "pwg:DocumentFormat": TDocumentFormatMimitype [],
        "scan:DocumentFormatExt": TDocumentFormatMimitype []
      },
      "scan:SupportedResolutions": {
        "scan:DiscreteResolutions": {
          "scan:DiscreteResolution": TDiscreteResolution[]
        }
      },
      "scan:ColorSpaces": { "scan:ColorSpace": TColorSpace[] }
    }
  },
  "scan:SupportedIntents": {
    "scan:Intent": TSupportedIntents[]
  },
  "scan:MaxOpticalXResolution": number,
  "scan:MaxOpticalYResolution": number,
  "scan:RiskyLeftMargin": number,
  "scan:RiskyRightMargin": number,
  "scan:RiskyTopMargin": number,
  "scan:RiskyBottomMargin": number
}
declare type TState = "disabled"| "enabled"

declare interface IScannerCapabilities extends Object{
  "pwg:Version": number,
  "pwg:MakeAndModel": string,
  "pwg:SerialNumber": string,
  "scan:Manufacturer": string,
  "scan:Certifications": {
    "scan:Certification": {
      "scan:Name": string,
      "scan:Version": number
    }
  },
  "scan:UUID": string,
  "scan:AdminURI": string,
  "scan:IconURI": string,
  "scan:Platen": {
    "scan:PlatenInputCaps": IInputCaps
  },
  "scan:Adf": {
    "scan:AdfSimplexInputCaps": IInputCaps,
    "scan:AdfDuplexInputCaps": IInputCaps,
    "scan:FeederCapacity": number,
    "scan:AdfOptions": { "scan:AdfOption": TAdfOption | TAdfOption[] }
  },
  "scan:BrightnessSupport": TSlider,
  "scan:ContrastSupport": TSlider,
  "scan:ThresholdSupport": TSlider,
  "scan:eSCLConfigCap": {
    "scan:StateSupport": { "scan:State": TState[] }
  },
  "scan:JobSourceInfoSupport": boolean
}
declare interface ICapabilities extends Object {
  "scan:ScannerCapabilities": IScannerCapabilities
}
declare type ICapabilitiesCallback = {
  capabilities:ICapabilities,
  scansetting: TScanSetting,
  BrightnessSupport: TBrightnessSupport | null
}
