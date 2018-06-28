import url from './url'
import assert from '../assert'


export namespace Errors {
  export class NoticeError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to create notice')
    }
  }
  
}

/**
 * @description Create a notice.
 * @param title Notice's title.
 * @param text Notice's text.
 * @param owner Notice's owner's id.
 */
export default async function(title: string, text: string, owner: number): Promise<string> {
  assert(owner > 0)
  let res: Response
  return await fetch(url.CREATE, {
    body: JSON.stringify({
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