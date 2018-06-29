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
  let { username, nickname, password } = opt
  assert(username && nickname && password)
  let res: Response

  let staticSalt: string

  staticSalt = await salt()  // Gnerate static salt

  // Calculate
  opt.password = sha512(staticSalt + opt.password).toString()
  await fetch(url.SIGNUP, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(opt)
  })
  .then(_res => {
    res = _res
    return res.text()
  })
  .then(msg => {
    if(res.status == 200) return Promise.resolve()
    let _msg: Msg
    try {
      _msg = JSON.parse(msg)
    } catch {
      return Promise.reject(new Errors.SignupError('Cannot sign up at this time'))
    }
    console.error(msg)
    switch(_msg.status) {
      case 400: throw new Errors.SignupError('Bad request')
      case 409: throw new Errors.UsernameExistsError
      case 500: throw new BaseErrors.ServerError
      default: throw new BaseErrors.UnknownError
    }
  })
}