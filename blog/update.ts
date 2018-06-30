import url from './url'
import assert from '../assert'
import Errors from './Errors'


/**
 * @description Update a blog.
 * @param title Blog's title.
 * @param text Blog's text.
 * @param id Blog's id.
 * @param published Blog's publishment state.
 */
export default async function(opt: { id: number, title?: string, text?: string, published?: boolean }): Promise<string> {
  assert(opt.title != null || opt.text != null || opt.published != null)
  let res: Response = await fetch(url.UPDATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opt)
  })
  let msg: string = await res.text()
  assert(res.status == 200, new Errors.BlogError(msg))
  return msg
}