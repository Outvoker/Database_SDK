import url from './url'
import encodeSearchParams from '../encodeSearchParams'


export namespace Errors {
  export class AlbumError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find album')
    }
  }
  
}

interface AlbumFindArg {
  id?: number,
  title?: string,
  description?: string,
  owner?: number,
  limit?: number,
  skip?: number,
  sort?: string
}

/**
 * @description Find an album.
 * @param id Album's id
 * @param title Album's title.
 * @param text Album's text.
 * @param published Album's publishment state.
 * @param owner Album's owner's id.
 */
export default async function(opt: AlbumFindArg): Promise<string> {
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
        return Promise.reject(new Errors.AlbumError)
      }
    }
  })

}