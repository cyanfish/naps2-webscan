// import * as  CONSTANT from '../libs/const';

function ab2string(buffer: any): string {
    var byteArray = new Uint8Array(buffer);
    var str = "", cc = 0, numBytes = 0;
    for (var i = 0, len = byteArray.length; i < len; ++i) {
        var v = byteArray[i];
        if (numBytes > 0) {
            //2 bit determining that this is a tailing byte + 6 bit of payload
            if ((cc & 192) === 192) {
                //processing tailing-bytes
                cc = (cc << 6) | (v & 63);
            } else {
                throw new Error("this is no tailing-byte");
            }
        } else if (v < 128) {
            //single-byte
            numBytes = 1;
            cc = v;
        } else if (v < 192) {
            //these are tailing-bytes
            throw new Error("invalid byte, this is a tailing-byte")
        } else if (v < 224) {
            //3 bits of header + 5bits of payload
            numBytes = 2;
            cc = v & 31;
        } else if (v < 240) {
            //4 bits of header + 4bit of payload
            numBytes = 3;
            cc = v & 15;
        } else {
            //UTF-8 theoretically supports up to 8 bytes containing up to 42bit of payload
            //but JS can only handle 16bit.
            throw new Error("invalid encoding, value out of range")
        }

        if (--numBytes === 0) {
            str += String.fromCharCode(cc);
        }
    }
    if (numBytes) {
        throw new Error("the bytes don't sum up");
    }
    return str;
}
function arraySortByKey<T>(array: T[], key: keyof T): T[] {
    // let arr:T[] = [];
    array.sort((a: T, b: T) => {
        return Number(a[key]) - Number(b[key])
    })
    return array
}
function getMaxValOfArrByKey<T>(array: T[], key: keyof T) {
    let newArr = arraySortByKey(array, key)
    return {
        min: newArr[0],
        max: newArr[newArr.length - 1]
    }
}

function getArrayCommonItem<T>(a1: T[], a2: T[]): T[] {
    let arr: T[] = [...a1, ...a2];
    let tmp: T[] = [];
    // for(var i = 0 ; i < a.length, i++){
    //     if(b.indexOf(a[i]) === -1){
    //         b.push(a[i])
    //     }
    // }
    arr.sort().sort((a: T, b: T) => {
        if (a === b && tmp.indexOf(a) === -1) {
            tmp.push(a)
        }
        return 1
    })
    return tmp
}

function formatScannerLEDMInfo(setting: Record<string, any>): Record<string, any> {
    if (!setting) {
        return {}
    }
    let obj: Record<string, any> = {}
    for (var key in setting) {
        let new_key = key.split(':')[1] as string
        if (Array.isArray(setting[key])) {
            obj[new_key] = []
            let arrSet = setting[key]
            for (let i = 0; i < arrSet.length; i++) {
                if (typeof arrSet[i] === 'object') {
                    obj[new_key].push(formatScannerLEDMInfo(arrSet[i]))
                } else {
                    obj[new_key].push(arrSet[i])
                }
            }
        } else if (typeof setting[key] === 'object') {
            obj[new_key] = formatScannerLEDMInfo(setting[key])
        } else {
            obj[new_key] = setting[key]
        }
    }
    return obj
}

module.exports = {
    ab2string: ab2string,
    arraySortByKey,
    getMaxValOfArrByKey,
    getArrayCommonItem,
    formatScannerLEDMInfo,
};

export {
    ab2string,
    arraySortByKey,
    getMaxValOfArrByKey,
    getArrayCommonItem,
    formatScannerLEDMInfo,
}