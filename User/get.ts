import url from './url'
import Errors from './Errors'
import User from './User'
import assert from '../assert'


/**
 * @description Get a user having specified `id`.
 * @param id User's id.
 */
export default async function(id: number): Promise<User> {
  assert(id, new Errors.UserError('Bad parameters'))
  let res: Response = await fetch(`${url.FIND}/${id}`, {
    credentials: 'include'
  })
  let msg: string = await res.text()
  switch(res.status) {
    case 200: break
    case 404: throw new Errors.UserNotFoundError
    default: throw new Errors.UserError('Unable to get user')
  }
  let user: User
  try {
    user = JSON.parse(msg)
  } catch {
    throw new Errors.UserError('Unable to get user')
  }
  assert(user.id && user.nickname, new Errors.UserError('Unable to get user'))
  return new User(user)
}