import url from './url'
import assert from '../assert'


export namespace Errors {
  export class NoticeError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find notice')
    }
  }
  
}

/**
 * @description Find a notice.
 * @param id Notice's id.
 * @param title Notice's title.
 * @param text Notice's text.
 * @param owner Notice's owner's id.
 */
export default async function(id?: number, title?: string, text?: string, owner?: number): Promise<string> {
  let res: Response
  return await fetch(url.FIND, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      id,
      title,
      text,
      owner
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