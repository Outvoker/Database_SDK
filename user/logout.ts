import Msg from '../messages'
import Errors from './Errors'
import BaseErrors from '../BaseErrors'
import url from './url'


/**
 * @description Logout.
 */
export default async function(): Promise<void> {

  let res: Response =  await fetch(url.LOGOUT, {
    credentials: 'include'
  })
  
  if(res.status == 200) return
  
  let msg: string = await res.text()
  console.error(msg)
  let _msg: Msg
  try {
    _msg = JSON.parse(msg)
  } catch {
    throw new Errors.LogoutError('Cannot logout at this time')
  }
  switch(_msg.status) {
    case 400: throw new Errors.LogoutError('Bad request')  // Usually an InvalidStateError
    case 500: throw new BaseErrors.ServerError
    default: throw new BaseErrors.UnknownError
  }
}