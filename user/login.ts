import assert from '../assert'
import Msg from '../messages'
import BaseErrors from '../BaseErrors'
import Errors from './Errors'
import url from './url'
import salt from './salt'
import { SHA512 as sha512 } from 'crypto-js'


/**
 * @description Login. Resolve user's ID.
 * @param opt User's username and password.
 */
export default async function(opt: { username: string; password: string }): Promise<number> {
  let { username, password } = opt
  assert(username && password, 'Username and password are required')
  
  // Get static salt
  let staticSalt: string
  // Get dynamic salt
  let dynamicSalt: string

  staticSalt = await fetch(`${url.LOGIN}?username=${encodeURIComponent(username)}`).then(res => res.text())
  dynamicSalt = await salt()

  // Calculate
  let res: Response = await fetch(`${url.LOGIN}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(
    sha512(dynamicSalt + sha512(staticSalt + password).toString()).toString()  // Dynamic-salted static-salted password
  )}`, {
    credentials: 'include'
  })

  let msg: string = await res.text()
  console.info(msg)
  let _msg: Msg & { id: number }
  try {
    _msg = JSON.parse(msg)
  } catch {
    throw new Errors.LoginError('Cannot login at this time')
  }
  if(res.status == 200) return _msg.id
  switch(_msg.status) {
    case 400: throw new Errors.LoginError('Bad request')  // Usually an InvalidStateError
    case 403: throw new Errors.UsernameOrPasswordError
    case 409: throw new Errors.AlreadyLoginError
    case 500: throw new BaseErrors.ServerError
    default: throw new BaseErrors.UnknownError
  }
}