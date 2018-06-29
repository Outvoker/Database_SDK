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
 * @param id Album's id
 * @param description Album's text.
 */
export default async function(id: number, title?: string, description?: string): Promise<string> {
  assert(title != null ||description != null )
  let res: Response
  return await fetch(url.UPDATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      id,
      title,
      description
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
        return Promise.reject(new Errors.AlbumError)
      }
    }
  })

}