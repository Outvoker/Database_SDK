import assert from '../assert'
import Msg from '../messages'
import Errors from './Errors'
import BaseErrors from '../BaseErrors'
import url from './url'
import salt from './salt'
import { SHA512 as sha512 } from 'crypto-js'


/**
 * @description Signup.
 * @param opt User's information.
 */
export default async function(opt: { username: string; nickname: string; password: string }): Promise<void> {
  assert(opt.username && opt.nickname && opt.password)

  let staticSalt: string = await salt()  // Gnerate static salt

  // Calculate
  opt.password = sha512(staticSalt + opt.password).toString()
  
  let res: Response = await fetch(url.SIGNUP, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(opt)
  })
  if(res.status == 200) return

  let msg: string = await res.text()
  console.error(msg)
  let _msg: Msg
  try {
    _msg = JSON.parse(msg)
  } catch {
    throw new Errors.SignupError('Cannot sign up at this time')
  }
  switch(_msg.status) {
    case 400: throw new Errors.SignupError('Bad request')
    case 409: throw new Errors.UsernameExistsError
    case 500: throw new BaseErrors.ServerError
    default: throw new BaseErrors.UnknownError
  }
}