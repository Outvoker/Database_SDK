import url from './url'
import assert from '../assert'
import encodeSearchParams from '../encodeSearchParams'


export namespace Errors {
  export class PhotoError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find photo')
    }
  }
  
}

interface PhotoFindArg {
  id?: number,
  owner?: number,
  fromDate?: number,
  toDate?: number,
  limit?: number,
  skip?: number,
  sort?: string
}

/**
 * @description Find a photo.
 * @param id Photo's id.
 * @param owner Photo's owner's id.
 * @param fromDate Photo's owner's id.
 * @param toDate Photo's owner's id.
 */
export default async function(opt: PhotoFindArg): Promise<string> {
  let res: Response
  return await fetch(url.FIND + '?' + encodeSearchParams(opt))
  .then(_res => {
    res = _res
    return res.text()
  })
  .then(msg => {
    if(res.status == 200) return Promise.resolve(msg)
    else {
      try {
        let _msg = JSON.parse(msg)
        return Promise.reject(_msg)
      } catch {
        return Promise.reject(new Errors.PhotoError)
      }
    }
  })

}