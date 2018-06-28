import url from './url'
import assert from '../assert'


export namespace Errors {
  export class PhotoError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to delete photo')
    }
  }
  
}

/**
 * @description Delete a photo.
 * @param id Photo's id.
 */
export default async function(id: number): Promise<string> {
  assert(id > 0)
  let res
  return await fetch(url.DELETE, {
    body: JSON.stringify({
      id
    })
  })
  .then(_res => {
    res = _res
    return res.text()
  })
  .then(msg => {
    if(res.status == 200) return msg
    else {
      try {
        let _msg = JSON.parse(msg)
        return Promise.reject(_msg)
      } catch {
        throw new Errors.PhotoError
      }
    }
  })

}