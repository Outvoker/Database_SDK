import url from './url'
import encodeSearchParams from '../encodeSearchParams'


export namespace Errors {
  export class BlogError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find blog')
    }
  }
  
}

interface BlogFindArg {
  id?: number,
  title?: string,
  text?: string,
  owner?: number,
  limit?: number,
  skip?: number,
  sort?: string
}
/**
 * @description Find a blog.
 * @param id Blog's id.
 * @param title Blog's title.
 * @param text Blog's text.
 * @param owner Blog's owner's id.
 * @param limit Blog's limit.
 * @param skip Blog's skip.
 * @param sort Blog's sort.
 */
export default async function(opt: BlogFindArg): Promise<string> {
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
        return Promise.reject(new Errors.BlogError)
      }
    }
  })

}