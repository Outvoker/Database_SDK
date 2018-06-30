import url from './url'
import encodeSearchParams from '../encodeSearchParams'


export namespace Errors {
  export class NoticeError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find comment')
    }
  }
  
}

interface NoticeFindArg {
  id?: number,
  blog?: number,
  text?: string,
  owner?: number,
  limit?: number,
  skip?: number,
  sort?: string
}

/**
 * @description Find a comment.
 * @param id Notice's id.
 * @param blog Notice's blog.
 * @param text Notice's text.
 * @param owner Notice's owner's id.
 */
export default async function(opt: NoticeFindArg): Promise<string> {
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
        return Promise.reject(new Errors.NoticeError)
      }
    }
  })

}