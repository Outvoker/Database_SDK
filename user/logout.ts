import Msg from '../messages'
import BaseErrors from '../BaseErrors'
import url from './url'


export namespace Errors {
  export class LogoutError extends Error {
    constructor(msg?: string) {
      super(msg || 'Logout error')
    }
  }
}

export default async function(): Promise<void> {

  // Logout
  await fetch(url.LOGOUT)
  .then(res => {
    if(res.status == 200) return
    return res.text()
  })
  .then(msg => {
    let _msg: Msg
    try {
      _msg = JSON.parse(msg)
    } catch {
      throw new Errors.LogoutError('Cannot logout at this time')
    }
    console.error((msg as Msg))
    switch(_msg.status) {
      case 400: throw new Errors.LogoutError('Bad request')  // Usually an InvalidStateError
      case 500: throw new BaseErrors.ServerError
      default: throw new BaseErrors.UnknownError
    }
  })
}