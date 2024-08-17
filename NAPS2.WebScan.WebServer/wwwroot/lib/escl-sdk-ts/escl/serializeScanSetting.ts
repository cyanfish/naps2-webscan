import {
  PAPPER_PAGE_SIZE,
  // RESOLUTIONS,
  XMLNS_PWG,
  XMLNS_SCAN,
  XMLNS_DEST,
  SCAN_SETTING_KEY_MAP
} from './const'
import { json2xml } from '../utils/xml'
/**
 * 
 * @param resolution 
 * @returns 
 */
const getSettingResolution = (resolution: number): number => {
  let res: number = resolution
  return res
}
const getSettingPaperSize = (paperType: string) => {
  let paper = {
    "pwg:Height": 3507,
    "pwg:Width": 2481,
    "pwg:XOffset": 0,
    "pwg:YOffset": 0,
    "_pwg:MustHonor": true
  }
  for (let i = 0; i < PAPPER_PAGE_SIZE.length; i++) {
    if (PAPPER_PAGE_SIZE[i].label === paperType) {
      paper["pwg:Height"] = PAPPER_PAGE_SIZE[i].Height
      paper["pwg:Width"] = PAPPER_PAGE_SIZE[i].Width
      paper["pwg:XOffset"] = PAPPER_PAGE_SIZE[i].XOffset
      paper["pwg:YOffset"] = PAPPER_PAGE_SIZE[i].YOffset
      paper["_pwg:MustHonor"] = true
      break;
    }
  }
  return {
    [SCAN_SETTING_KEY_MAP.ScanRegion]: paper
  }
}

const getSettingInputSource = (inout: TOrigin): TInoutSource => {
  let inoutSource: TInoutSource = inout === 'ADF' ? 'Feeder' : 'Platen'
  return inoutSource
}

const getSettingIntent = (Intent: TDocumentFormatMimitype): TSupportedIntents => {
  let intent: TSupportedIntents = Intent === 'application/pdf' ? 'Document' : 'Photo'
  return intent
}

const getHttpDest = (httpDest: THttpDestination): Record<string, any> => {
  let httpdest: Record<string, any> = {};
  for (let key in httpDest) {
    switch (key) {
      case 'HttpHeaders':
        httpdest[SCAN_SETTING_KEY_MAP.HttpHeaders] = {}
        httpdest[SCAN_SETTING_KEY_MAP.HttpHeaders][SCAN_SETTING_KEY_MAP.HttpHeader] = httpDest[key]
        continue;
      case 'RetryInfo':
        httpdest[SCAN_SETTING_KEY_MAP.RetryInfo] = {
          [SCAN_SETTING_KEY_MAP.NumberOfRetries]: httpDest.RetryInfo.NumberOfRetries,
          [SCAN_SETTING_KEY_MAP.RetryInterval]: httpDest.RetryInfo.RetryInterval,
          [SCAN_SETTING_KEY_MAP.RetryTimeOut]: httpDest.RetryInfo.RetryTimeOut
        }
        continue;
      default:
        httpdest[SCAN_SETTING_KEY_MAP[key]] = httpDest[key]
    }
  }
  return httpdest
}

const getDestinations = (destionSetting: TScanDestinations): Record<string, any> => {
  let destination: Record<string, any> = {};
  if (destionSetting && Array.isArray(destionSetting)) {
    destination[SCAN_SETTING_KEY_MAP.HttpDestination] = [];
    for (let i = 0; i < destionSetting.length; i++) {
      destination[SCAN_SETTING_KEY_MAP.HttpDestination].push(getHttpDest(destionSetting[i]))
    }
  } else {
    destination[SCAN_SETTING_KEY_MAP.HttpDestination] = getHttpDest(destionSetting)
  }
  return destination
}
const getScanSettingObj = (setting: ISupportedScanSetting): object => {
  let config: Record<string, any> = {
    "_xmlns:scan": XMLNS_SCAN,
    "_xmlns:pwg": XMLNS_PWG,
    "_xmlns:dest": XMLNS_DEST,
  }


  let key: keyof ISupportedScanSetting;
  for (key in setting) {
    switch (key) {
      case 'DocumentFormat':
        config[SCAN_SETTING_KEY_MAP.Intent] = getSettingIntent(setting.DocumentFormat)
        if (setting.Version < 2.1) {
          config[SCAN_SETTING_KEY_MAP.DocumentFormat] = setting[key]
        } else {
          config[SCAN_SETTING_KEY_MAP.DocumentFormatExt] = setting[key]
        };
        continue;
      case 'InputSource':
        config[SCAN_SETTING_KEY_MAP[key]] = getSettingInputSource(setting[key]);
        continue;
      case 'ScanRegions':
        config[SCAN_SETTING_KEY_MAP.ScanRegions] = getSettingPaperSize(setting[key])
        continue;
      case 'ScanDestinations':
        config[SCAN_SETTING_KEY_MAP.ScanDestinations] = getDestinations(setting[key])
        continue;
      case 'Resolution':
        continue;
      default:
        config[SCAN_SETTING_KEY_MAP[key]] = setting[key]
    }
  }
  let resolution = getSettingResolution(setting.Resolution)
  config[SCAN_SETTING_KEY_MAP.XResolution] = resolution
  config[SCAN_SETTING_KEY_MAP.YResolution] = resolution

  return { "scan:ScanSettings": config }
}

function getScanSetting(setting: ISupportedScanSetting): string {
  let settingObj = getScanSettingObj(setting)
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + json2xml(settingObj)
}


module.exports = {
  getSettingResolution,
  getSettingPaperSize,
  getSettingInputSource,
  getSettingIntent,
  getScanSettingObj,
  getScanSetting,
}

export {
  getSettingResolution,
  getSettingPaperSize,
  getSettingInputSource,
  getSettingIntent,
  getScanSettingObj,
  getScanSetting,
}