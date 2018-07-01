import url from './url'
import assert from '../assert'
import Errors from './Errors'


/**
 * @description Delete a ballot.
 * @param id Ballot's id.
 */
export default async function(id: number): Promise<string> {
  assert(id > 0)
  let res: Response = await fetch(url.DELETE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      id
    })
  })
  let msg: string = await res.text()
  if(res.status == 200) return msg
  else throw new Errors.BallotError('Unable to delete ballot')
}