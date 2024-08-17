const { PAPPER_PAGE_SIZE, DOCUMENT_FORMART, SUPPORED_COLOR_MODES } = require('./const')
const { getArrayCommonItem } = require('../utils/index')

export const getScanRegion = (InputCaps: IInputCaps): IScanSettingScanRegion => {
  let ScanRegion: IScanSettingScanRegion = {
    default_value: 'A4',
    options: [],
    name: 'ScanRegions'
  }
  // let InputCaps:IInputCaps
  // if(type == 'platen'){
  //   InputCaps = capabilities['scan:ScannerCapabilities']['scan:Platen']['scan:PlatenInputCaps']
  // }else{
  //   InputCaps = capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfSimplexInputCaps']
  // }
  let MaxHeight = InputCaps['scan:MaxHeight']
  let MinHeight = InputCaps['scan:MinHeight']
  let MaxWidth = InputCaps['scan:MaxWidth']
  let MinWidth = InputCaps['scan:MinWidth']
  for (let i = 0; i < PAPPER_PAGE_SIZE.length; i++) {
    let size = PAPPER_PAGE_SIZE[i]
    if (size.Height > MinHeight && size.Height < MaxHeight && size.Width > MinWidth && size.Width < MaxWidth) {
      ScanRegion.options.push(size.label)
    }
  }
  ScanRegion.default_value = ScanRegion.options[0]
  return ScanRegion

}
export const getColorMode = (InputCaps: IInputCaps): IScanSettingColorMode => {
  let ColorMode: IScanSettingColorMode = {
    default_value: 'RGB24',
    options: [],
    name: 'ColorMode'
  }
  ColorMode.options = getArrayCommonItem(SUPPORED_COLOR_MODES, InputCaps['scan:SettingProfiles']['scan:SettingProfile']['scan:ColorModes']["scan:ColorMode"])



  ColorMode.default_value = ColorMode.options[0]
  return ColorMode
}
export const getResolution = (InputCaps: IInputCaps): IScanSettingResolution => {
  let Resolution: IScanSettingResolution = {
    default_value: 75,
    options: [],
    name: 'Resolution'
  }
  let DiscreteResolution: TDiscreteResolution[] = InputCaps['scan:SettingProfiles']['scan:SettingProfile']['scan:SupportedResolutions']['scan:DiscreteResolutions']['scan:DiscreteResolution'];

  for (let i = 0; i < DiscreteResolution.length; i++) {
    Resolution.options.push(DiscreteResolution[i]['scan:XResolution'])
  }
  Resolution.default_value = Resolution.options[0]
  return Resolution
}
export const getDocumentFormat = (InputCaps: IInputCaps): IScanSettingDocumentFormat => {
  let DocumentFormat: IScanSettingDocumentFormat = {
    default_value: 'image/jpeg',
    options: [],
    name: 'DocumentFormat'
  }
  let DiscreteDocumentFormat: TDocumentFormatMimitype[] = InputCaps['scan:SettingProfiles']['scan:SettingProfile']['scan:DocumentFormats']['pwg:DocumentFormat'];

  for (let i = 0; i < DOCUMENT_FORMART.length; i++) {
    let idx = DiscreteDocumentFormat.findIndex((d: TDocumentFormatMimitype) => { return d == DOCUMENT_FORMART[i] })
    if (idx > -1) {
      DocumentFormat.options.push(DOCUMENT_FORMART[i])
    }
  }
  DocumentFormat.default_value = DocumentFormat.options[0]
  return DocumentFormat
}

export const getScanSettingConfig = (capabilities: ICapabilities): TScanSetting => {
  let ScanSetting: TScanSetting = {
    adf: {
      Simplex: [],
      Duplex: [],
      AdfOptions: [],
      FeederCapacity: 0,
    },
    platen: []
  }

  if (capabilities['scan:ScannerCapabilities']['scan:Adf']) {
    ScanSetting.adf.Simplex = [
      getScanRegion(capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfSimplexInputCaps']),
      getColorMode(capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfSimplexInputCaps']),
      getResolution(capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfSimplexInputCaps']),
      getDocumentFormat(capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfSimplexInputCaps'])
    ]
    ScanSetting.adf.FeederCapacity = capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:FeederCapacity']
    ScanSetting.adf.AdfOptions = capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfOptions']["scan:AdfOption"]
    if (capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfDuplexInputCaps']) {
      ScanSetting.adf.Duplex = [
        getScanRegion(capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfDuplexInputCaps']),
        getColorMode(capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfDuplexInputCaps']),
        getResolution(capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfDuplexInputCaps']),
        getDocumentFormat(capabilities['scan:ScannerCapabilities']['scan:Adf']['scan:AdfDuplexInputCaps'])
      ]
    }
  }
  if (capabilities['scan:ScannerCapabilities']['scan:Platen']) {
    ScanSetting.platen = [
      getScanRegion(capabilities['scan:ScannerCapabilities']['scan:Platen']['scan:PlatenInputCaps']),
      getColorMode(capabilities['scan:ScannerCapabilities']['scan:Platen']['scan:PlatenInputCaps']),
      getResolution(capabilities['scan:ScannerCapabilities']['scan:Platen']['scan:PlatenInputCaps']),
      getDocumentFormat(capabilities['scan:ScannerCapabilities']['scan:Platen']['scan:PlatenInputCaps'])
    ]
  }
  return ScanSetting
}

export const getScannerBrightness = (capabilities: ICapabilities): TBrightnessSupport | null => {
  if (capabilities['scan:ScannerCapabilities']['scan:BrightnessSupport']) {
    let obj: TBrightnessSupport = {
      Min: capabilities['scan:ScannerCapabilities']['scan:BrightnessSupport']['scan:Min'],
      Max: capabilities['scan:ScannerCapabilities']['scan:BrightnessSupport']['scan:Max'],
      Step: capabilities['scan:ScannerCapabilities']['scan:BrightnessSupport']['scan:Step'],
      Normal: capabilities['scan:ScannerCapabilities']['scan:BrightnessSupport']['scan:Normal'],
    }
    return obj
  } else {
    return null
  }

}