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
export default async function(opt: { title: string; text: string; published: boolean; owner: number }): Promise<number> {
  assert(opt.owner > 0)
  let res: Response = await fetch(url.CREATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opt)
  })
  let msg: string = await res.text()
  switch(res.status) {
    case 200: return parseInt(msg, 10)
    case 403: throw new Errors.NotBloggerError
    default: throw new Errors.BallotError(msg)
  }
}