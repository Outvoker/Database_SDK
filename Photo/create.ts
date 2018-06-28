import url from './url'
import assert from '../assert'


export namespace Errors {
  export class PhotoError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to create photo')
    }
  }
  
}

/**
 * @description Create a photo.
 * @param path Photo's path.
 * @param album Photo's album.
 * @param owner Photo's owner's id.
 */
export default async function(path: string, album: string, owner: number): Promise<string> {
  assert(owner > 0)
  let res
  return await fetch(url.CREATE, {
    body: JSON.stringify({
      path,
      album,
      owner
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