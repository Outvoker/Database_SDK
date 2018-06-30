import url from './url'
import assert from '../assert'
import Errors from './Errors'


/**
 * @description Update a notice.
 * @param id Notice's id.
 * @param text Notice's text.
 */
export default async function(opt: { id: number; text?: string }): Promise<string> {
  let res: Response = await fetch(url.UPDATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opt)
  })
  switch(res.status) {
    case 200: break
    case 403: throw new Errors.CommentError('Please login first')
    default: throw new Errors.CommentError('Unable to create comment')
  }
  let msg: string = await res.text()
  return msg
}