import url from './url'
import assert from '../assert'
import Errors from './Errors'


/**
 * @description Update a ballot.
 * @param title Ballot's title.
 * @param text Ballot's text.
 * @param id Ballot's id.
 * @param published Ballot's publishment state.
 */
export default async function(opt: { id: number, title?: string, text?: string, published?: boolean }): Promise<string> {
  assert(opt.title != null || opt.text != null || opt.published != null)
  let res: Response = await fetch(url.UPDATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opt)
  })
  let msg: string = await res.text()
  assert(res.status == 200, new Errors.BallotError(msg))
  return msg
}