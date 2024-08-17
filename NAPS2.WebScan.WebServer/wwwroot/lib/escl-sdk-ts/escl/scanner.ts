const { getScanSettingConfig, getScannerBrightness } = require('./getCapabilities')
const { getScanSetting } = require('./serializeScanSetting')

const request = require('../utils/request').default;
/**
 * 
 * @param { Object } opts 
 * @param { string } opts.ip 
 * @param { number} opts.port
 * @param { string} opts.rs
 */

interface IScannerConstructor {
	ip: string;
	version: number;
	rs: string;
	port: number;
}
class Scanner {
	private ip: string;
	private version: number = 2.1;
	private rs: string = 'eSCL';
	private prototype = 'http://'
	private port: number = 8080

	constructor(opts: IScannerConstructor) {
		this.ip = opts.ip;
		this.port = opts.port || 8080;
		this.version = opts.version || 2.0;
		this.rs = opts.rs || 'eSCL'
	}

	private execute<T>(path: string, opts?: any): Promise<T> {
		let params = { url: '' }
		if (opts) {
			params = { ...opts }
		}

		params.url = `${this.prototype}${this.ip}:${this.port}/${this.rs}/${path}`
		return request(params)
	}

	async ScannerCapabilities(): Promise<ICapabilitiesCallback> {
		let data = {
			method: 'GET'
		}
		try {
			let res: ICapabilities = await this.execute('ScannerCapabilities', data)
			return {
				capabilities: res,
				scansetting: getScanSettingConfig(res),
				BrightnessSupport: getScannerBrightness(res)
			}
		} catch (error) {
			throw error
		}

	}


	async ScanJobs(params: IScanSettingParams): Promise<string> {
		let data = {
			method: 'POST',
			data: getScanSetting({ ...params, Version: this.version })
		}
		let res: any = await this.execute('ScanJobs', data)
		return res.headers.Location
	}

	async ScannerStatus(): Promise<Record<string, any>> {
		try {
			let res: Record<string, any> = await this.execute('ScannerStatus')
			return res['scan:ScannerStatus']
		} catch (error) {
			throw error
		}
	}

	NextDocument(jobId: string): Promise<any> {
		return this.execute(`ScanJobs/${jobId}/NextDocument`, { responseType: 'arraybuffer' }).then(res => {
			return res
		})
	}

	ScanImageInfo(jobId: string): Promise<any> {
		return this.execute(`ScanJobs/${jobId}/ScanImageInfo`).then(res => {
			return res
		})
	}
}


export { Scanner };
