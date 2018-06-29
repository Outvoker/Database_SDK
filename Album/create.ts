import url from './url'
import assert from '../assert'


export namespace Errors {
  export class AlbumError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to create album')
    }
  }
  
}

/**
 * @description Create a album.
 * @param title Album's title.
 * @param description Album's text.
 * @param owner Album's owner's id.
 */
export default async function(title: string, description: string, owner: number): Promise<string> {
  assert(owner > 0)
  let res: Response
  return await fetch(url.CREATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      title,
      description,
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
        return Promise.reject(new Errors.AlbumError)
      }
    }
  })

}