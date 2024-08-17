



const ERROR_CODE = {
    'ERROR_UNKNOWN_ERROR': 'ERR_00001',
    'ERROR_PRINTER_UNAVAILABLE': 'ERR_00002',
    'ERROR_PRINTER_INFO': 'ERR_00003',
    'ERROR_PRINT_IMAGE': 'ERR_00003',
    'ERROR_UNSUPPORT_FILE_TYPE': 'ERR_00004',
    'ERROR_PRINERT_IS_BUSY': 'ERR_00005',
    'ERROR_PRINT_JOB_INFO': 'ERR_00006'
}

const SCANNER_STATE = {
    'STATE_IDLE': 'Idle', //空闲状态，可能会有状态警告，可以提交打印任务
    'STATE_STOP': 'Stopped', //停止状态，有状态错误，不能提交打印任务
    'STATE_TESTING': 'Testing', //正在准备，不能提交打印任务
    'STATE_DOWN': 'Down', //打印机有问题，不能提交打印任务
    'STATE_PROCESSING': 'Processing' //处理打印任务中，不能提交打印任务
}
const JOB_STATE = {
    'STATE_CANCELED': 'Canceled', //end state 最终状态 扫描任务被取消
    'STATE_ABORTED': 'Aborted', //end state 最终状态 扫描任务被放弃
    'STATE_TESTING': 'Completed', //扫描完成
    'STATE_DOWN': 'Pending', // 扫描正在排队
    'STATE_PROCESSING': 'Processing' // 扫描任务正在进行
}

const SUPPORED_COLOR_MODES = [
    'Grayscale8',
    'RGB24',
]

const PAPPER_PAGE_SIZE: TPaperPageSize[] = [
    {
        label: "A4",
        Height: 3507,
        Width: 2481,
        XOffset: 0,
        YOffset: 0
    },
    {
        label: "Letter",
        Height: 3300,
        Width: 2550,
        XOffset: 0,
        YOffset: 0
    },
    {
        label: "5x7 in.",
        Height: 2100,
        Width: 1500,
        XOffset: 0,
        YOffset: 0
    },
    {
        label: "4x6 in.",
        Height: 1800,
        Width: 1200,
        XOffset: 0,
        YOffset: 0
    },
    {
        label: "10x15 cm",
        Height: 1771,
        Width: 1181,
        XOffset: 0,
        YOffset: 0
    }
]


const RESOLUTIONS: TResolutions[] = [
    {
        label: "Screen 75dpi",
        xResolution: 75,
        yResolution: 75
    },
    {
        label: "Photo 200dpi",
        xResolution: 200,
        yResolution: 200
    },
    {
        label: "Text 300dpi",
        xResolution: 300,
        yResolution: 300
    },
    {
        label: "Height 600dpi",
        xResolution: 600,
        yResolution: 600
    }
]

const DOCUMENT_FORMART: TDocumentFormatMimitype[] = ['image/jpeg', 'application/pdf']
const XMLNS_SCAN = "http://schemas.hp.com/imaging/escl/2011/05/03"
const XMLNS_COPY = "http://www.hp.com/schemas/imaging/con/copy/2008/07/07"
const XMLNS_DD = "http://www.hp.com/schemas/imaging/con/dictionaries/1.0/"
const XMLNS_DD3 = "http://www.hp.com/schemas/imaging/con/dictionaries/2009/04/06"
const XMLNS_FW = "http://www.hp.com/schemas/imaging/con/firewall/2011/01/05"
const XMLNS_SCC = "http://schemas.hp.com/imaging/escl/2011/05/03"
const XMLNS_PWG = "http://www.pwg.org/schemas/2010/12/sm"
const XMLNS_DEST = "http://schemas.hp.com/imaging/httpdestination/2011/10/13"
const SCAN_SETTING_KEY_MAP:Record<keyof ISupportedScanSetting,string> | Record<keyof THttpDestination, string>| Record<keyof TScanDestinations, string> | Record<keyof THttpHeader, string> | Record<keyof TRetryInfo, string> = {
    Version: 'pwg:Version',
    Intent: 'scan:Intent',
    ScanRegions: 'pwg:ScanRegions',
    ScanRegion: 'pwg:ScanRegion',
    Height: 'pwg:Height',
    Width: 'pwg:Width',
    XOffset: 'pwg:XOffset',
    YOffset: 'pwg:YOffset',
    InputSource: 'pwg:InputSource',
    XResolution: 'scan:XResolution',
    YResolution: 'scan:YResolution',
    ColorMode: 'scan:ColorMode',
    Brightness: 'scan:Brightness',
    Contrast: 'scan:Contrast',
    CompressionFactor: 'scan:CompressionFactor',
    DocumentFormatExt: 'scan:DocumentFormatExt',
    DocumentFormat: 'scan:DocumentFormat',
    Duplex: 'scan:Duplex',
    Resolution: 'scan:Resolution', 
    ScanDestinations: 'scan:ScanDestinations',
    DestinationUri:'pwg:DestinationUri',
    ReferenceID:'dest:ReferenceID',
    RetryInfo:'pwg:RetryInfo',
    NumberOfRetries:'pwg:NumberOfRetries',
    RetryInterval:'pwg:RetryInterval',
    RetryTimeOut:'pwg:RetryTimeOut',
    JobOriginatingUserName:'pwg:JobOriginatingUserName',
    JobPassword:'pwg:JobPassword',
    HttpMethod:'dest:HttpMethod',
    HttpHeaders:'dest:HttpHeaders',
    HttpHeader:'dest:HttpHeader',
    CertificateValidation:'dest:CertificateValidation',
    HttpDestination:'dest:HttpDestination'
}


module.exports = {
    ERROR_CODE: ERROR_CODE,
    RESOLUTIONS,
    DOCUMENT_FORMART,
    PAPPER_PAGE_SIZE,
    XMLNS_PWG,
    XMLNS_SCC,
    XMLNS_FW,
    XMLNS_DD3,
    XMLNS_DD,
    XMLNS_COPY,
    XMLNS_SCAN,
    SCAN_SETTING_KEY_MAP,
    JOB_STATE,
    SCANNER_STATE,
    SUPPORED_COLOR_MODES,
    XMLNS_DEST
}

export {
    ERROR_CODE,
    PAPPER_PAGE_SIZE,
    RESOLUTIONS,
    DOCUMENT_FORMART,
    XMLNS_PWG,
    XMLNS_SCC,
    XMLNS_FW,
    XMLNS_DD3,
    XMLNS_DD,
    XMLNS_COPY,
    XMLNS_SCAN,
    SCAN_SETTING_KEY_MAP,
    JOB_STATE,
    SCANNER_STATE,
    SUPPORED_COLOR_MODES,
    XMLNS_DEST
}