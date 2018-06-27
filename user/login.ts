import assert from '../assert'
import Msg from '../messages'
import BaseErrors from '../BaseErrors'
import url from './url'
import salt from './salt'
import { SHA512 as sha512 } from 'crypto-js'


export namespace Errors {
  export class SaltError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to get salt')
    }
  }
  export class LoginError extends Error {
    constructor(msg?: string) {
      super(msg || 'Login error')
    }
  }
  export class AlreadyLoginError extends Error {
    constructor(msg?: string) {
      super(msg || 'Already logged in')
    }
  }
  export class UsernameOrPasswordError extends Error {
    constructor(msg?: string) {
      super(msg || 'Username or password incorrect')
    }
  }
}

export default async function(username: string, password: string): Promise<void> {
  assert(username && password, 'Username and password are required')
  let res
  // Get static salt
  let staticSalt: string
  // Get dynamic salt
  let dynamicSalt: string

  try {
    staticSalt = await fetch(`${url.LOGIN}?username=${encodeURIComponent(username)}`).then(res => res.text())
    dynamicSalt = await salt()
  } catch {
    throw new Errors.SaltError
  }

  // Calculate
  await fetch(`${url.LOGIN}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(
    sha512(dynamicSalt + sha512(staticSalt + password).toString()).toString()  // Dynamic-salted static-salted password
  )}`)
  .then(_res => {
    res = _res
    return res.text()
  })
  .then(msg => {
    if(res.status == 200) return
    let _msg: Msg
    try {
      _msg = JSON.parse(msg)
    } catch {
      throw new Errors.LoginError('Cannot login at this time')
    }
    console.error((msg as Msg))
    switch(_msg.status) {
      case 400: throw new Errors.LoginError('Bad request')  // Usually an InvalidStateError
      case 403: throw new Errors.UsernameOrPasswordError
      case 409: throw new Errors.AlreadyLoginError
      case 500: throw new BaseErrors.ServerError
      default: throw new BaseErrors.UnknownError
    }
  })
}