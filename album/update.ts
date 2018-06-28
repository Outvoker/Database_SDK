import url from './url'
import assert from '../assert'


export namespace Errors {
  export class AlbumError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to update album')
    }
  }
  
}

/**
 * @description Update a album.
 * @param title Album's title.
 * @param description Album's text.
 */
export default async function(title?: string, description?: string): Promise<string> {
  assert(title != null ||description != null )
  let res
  return await fetch(url.UPDATE, {
    body: JSON.stringify({
      title,
      description
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
        throw new Errors.AlbumError
      }
    }
  })

}