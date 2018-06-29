import url from './url'
import assert from '../assert'


export namespace Errors {
  export class BlogError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to update blog')
    }
  }
  
}

/**
 * @description Update a blog.
 * @param title Blog's title.
 * @param text Blog's text.
 * @param id Blog's id.
 * @param published Blog's publishment state.
 */
export default async function(id: number, title?: string, text?: string, published?: boolean): Promise<string> {
  assert(title != null || text != null || published != null)
  let res: Response
  return await fetch(url.UPDATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      id,
      title,
      text,
      published
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
        return Promise.reject(new Errors.BlogError)
      }
    }
  })

}