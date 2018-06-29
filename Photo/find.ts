import url from './url'
import assert from '../assert'


export namespace Errors {
  export class PhotoError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find photo')
    }
  }
  
}

/**
 * @description Find a photo.
 * @param id Photo's id.
 * @param owner Photo's owner's id.
 * @param fromDate Photo's owner's id.
 * @param toDate Photo's owner's id.
 */
export default async function(id?: number, owner?: number, fromDate?: number, toDate?: number): Promise<string> {
  assert((!fromDate && !toDate) || (fromDate && toDate))
  let res: Response
  return await fetch(url.FIND, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      id,
      owner,
      fromDate,
      toDate
    })
  })
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