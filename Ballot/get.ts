import url from './url'
import Errors from './Errors'
import Ballot from './Ballot'
import assert from '../assert'
import Option from '../Option'


/**
 * @description Get a ballot having specified `id`.
 * @param id Ballot's id.
 */
export default async function(id: number): Promise<Ballot> {
  assert(id, new Errors.BallotError('Bad parameters'))
  let res: Response = await fetch(`${url.FIND}/${id}`, {
    credentials: 'include'
  })
  let msg: string = await res.text()
  switch(res.status) {
    case 200: break
    case 404: throw new Errors.BallotNotFoundError
    default: throw new Errors.BallotError('Unable to get ballot')
  }
  let ballot: Ballot
  try {
    ballot = JSON.parse(msg)
  } catch {
    throw new Errors.BallotError('Unable to get ballot')
  }
  assert(ballot.id && ballot.title, new Errors.BallotError('Unable to get ballot'))
  try {
    ballot.options = await Option.find({
      ballot: id
    })
  } catch {}
  return new Ballot(ballot)
}