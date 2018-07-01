import url from './url'
import assert from '../assert'
import Errors from './Errors'


/**
 * @description Get the number of blogs (of a specified user).
 * @param id Owner's id.
 * @param number The number of blogs.
 */
export default async function(id?: number): Promise<number> {
  assert(typeof id == 'number' || !id, new Errors.BallotError('Bad parameter'))
  let res: Response = await fetch(`${url.COUNT}${id ? `?id=${id}` : ''}`, {
    credentials: 'include'
  })
  let msg: string = await res.text()
  if(res.status == 200) return parseInt(msg, 10)
  else throw new Errors.BallotError('Unable to get count')
}