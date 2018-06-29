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
  let res: Response = await fetch(url.STATE)
  if(res.status != 200) throw new BaseErrors.ServerError

  let msg: string = await res.text()
  if(msg == '0') return null
  let user: User
  try {
    user = JSON.parse(msg)
  } catch {
    throw new Errors.StateError
  }
}