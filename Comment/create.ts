import url from './url'
import assert from '../assert'
import Errors from './Errors'



/**
 * @description Create a comment.
 * @param blog Notice's blog.
 * @param text Notice's text.
 * @param owner Notice's owner's id.
 */
export default async function(opt: { blog: number, text: string, owner: number }): Promise<string> {
  assert(opt.owner > 0)
  let res: Response =  await fetch(url.CREATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opt)
  })
  let msg: string = await res.text()
  if(res.status == 200) return msg
  else throw new Errors.CommentError(msg)
}