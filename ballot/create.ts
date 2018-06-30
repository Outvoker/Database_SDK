import url from './url'
import assert from '../assert'
import Errors from './Errors'
import Msg from '../messages'
import BaseErrors from '../BaseErrors'


/**
 * @description Create a ballot.
 * @param title Ballot's title.
 * @param text Ballot's text.
 * @param published Ballot's publishment state.
 * @param owner Ballot's owner's id.
 */
export default async function(opt: { title: string; text: string; published: boolean; owner: number }): Promise<string> {
  assert(opt.owner > 0)
  let res: Response = await fetch(url.CREATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opt)
  })
  let msg: string = await res.text()
  if(res.status == 200) return
  else {
    let _msg: Msg
    try {
      _msg = JSON.parse(msg)
    } catch {
      throw new Errors.BallotError
    }
    assert(_msg.status, new BaseErrors.UnknownError)
    switch(_msg.status) {
      case 403: throw new Errors.NotBloggerError
      default: throw new Errors.BallotError
    }
  }
}