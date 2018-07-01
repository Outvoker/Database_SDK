import url from './url'
import Errors from './Errors'
import Ballot from './Ballot'
import encodeSearchParams from '../encodeSearchParams'
import assert from '../assert'


export interface BallotFindArg {
  id?: number
  title?: string
  text?: string
  owner?: number
  omit?: string
  limit?: number
  skip?: number
  sort?: string
  where?: any
}

/**
 * @description Find a ballot.
 * @param id Ballot's id
 * @param title Ballot's title.
 * @param text Ballot's text.
 * @param published Ballot's publishment state.
 * @param owner Ballot's owner's id.
 */
export default async function(opt: BallotFindArg): Promise<Ballot[]> {
  opt.where = JSON.stringify(opt.where || {})
  let res: Response = await fetch(url.FIND + '?' + encodeSearchParams(opt), {
    credentials: 'include'
  })
  let msg: string = await res.text()
  assert(res.status == 200, new Errors.BallotError(msg))
  let ballots: Ballot[]
  try {
    ballots = JSON.parse(msg)
  } catch {
    throw new Errors.BallotError(msg)
  }
  assert(ballots instanceof Array, new Errors.BallotError('Unable to find ballot'))
  return ballots.map(ballot => new Ballot(ballot))
}