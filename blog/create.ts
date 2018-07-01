import url from './url'
import assert from '../assert'
import Errors from './Errors'
import Msg from '../messages'
import BaseErrors from '../BaseErrors'



/**
 * @description Create a blog.
 * @param title Blog's title.
 * @param text Blog's text.
 * @param published Blog's publishment state.
 * @param owner Blog's owner's id.
 */
export default async function(opt: { title: string; text: string; published: boolean; owner: number }): Promise<void> {
  assert(opt.owner > 0)
  let res: Response = await fetch(url.CREATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opt)
  })
  let msg: string = await res.text()
  switch(res.status) {
    case 200: return
    case 403: throw new Errors.NotBloggerError
    default: throw new Errors.BlogError(msg)
  }
}