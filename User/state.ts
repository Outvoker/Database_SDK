import assert from '../assert'
import Msg from '../messages'
import User from './User'
import Errors from './Errors'
import BaseErrors from '../BaseErrors'
import url from './url'


/**
 * @description Get user's state. Resolve null if not logged in.
 */
export default async function(): Promise<User | null> {
  let res: Response = await fetch(url.STATE, {
    credentials: 'include'
  })
  if(res.status != 200) throw new BaseErrors.ServerError

  let msg: string = await res.text()
  let user: User
  try {
    user = JSON.parse(msg)
    if(user.id) return user
    else return null
  } catch {
    throw new Errors.StateError
  }
}