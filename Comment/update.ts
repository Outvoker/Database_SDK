import url from './url'
import assert from '../assert'


export namespace Errors {
  export class NoticeError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to update notice')
    }
  }
  
}

/**
 * @description Update a notice.
 * @param id Notice's id.
 * @param text Notice's text.
 */
export default async function(id: number, text?: string): Promise<string> {
  let res: Response
  return await fetch(url.UPDATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      id,
      text
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
        return Promise.reject(new Errors.NoticeError)
      }
    }
  })

}