import url from './url'
import encodeSearchParams from '../encodeSearchParams'


export namespace Errors {
  export class BallotError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find ballot')
    }
  }
  
}

interface BallotFindArg {
  id?: number,
  title?: string,
  text?: string,
  owner?: number,
  limit?: number,
  skip?: number,
  sort?: string
}

/**
 * @description Find a ballot.
 * @param id Ballot's id
 * @param title Ballot's title.
 * @param text Ballot's text.
 * @param published Ballot's publishment state.
 * @param owner Ballot's owner's id.
 */
export default async function(opt: BallotFindArg): Promise<string> {
  let res: Response
  return await fetch(url.FIND + '?' + encodeSearchParams(opt))
  .then(_res => {
    res = _res
    return res.text()
  })
  .then(msg => {
    if(res.status == 200) return Promise.resolve(msg)
    else {
      try {
        let _msg = JSON.parse(msg)
        return Promise.reject(_msg)
      } catch {
        return Promise.reject(new Errors.BallotError)
      }
    }
  })

}