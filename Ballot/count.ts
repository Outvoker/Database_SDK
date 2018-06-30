import url from './url'
import assert from '../assert'
import Errors from './Errors'
import Msg from '../messages'
import BaseErrors from '../BaseErrors'


/**
 * @description Get the number of blogs (of a specified user).
 * @param id Owner's id.
 * @param number The number of blogs.
 */
export default async function(id?: number): Promise<number> {
  assert(typeof id == 'number' || !id, new Errors.BlogError('Bad parameter'))
  let res: Response = await fetch(`${url.COUNT}${id ? `?id=${id}` : ''}`, {
    credentials: 'include'
  })
  let msg: string = await res.text()
  if(res.status == 200) return parseInt(msg, 10)
  else throw new Errors.BlogError('Unable to get count')
}