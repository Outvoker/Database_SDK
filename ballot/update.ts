import url from './url'
import assert from '../assert'


export namespace Errors {
  export class BallotError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to update ballot')
    }
  }
  
}

/**
 * @description Update a ballot.
 * @param title Ballot's title.
 * @param text Ballot's text.
 * @param published Ballot's publishment state.
 */
export default async function(title?: string, text?: string, published?: boolean): Promise<string> {
  assert(title != null || text != null || published != null)
  let res
  return await fetch(url.UPDATE, {
    body: JSON.stringify({
      title,
      text,
      published
    })
  })
  .then(_res => {
    res = _res
    return res.text()
  })
  .then(msg => {
    if(res.status == 200) return msg
    else {
      try {
        let _msg = JSON.parse(msg)
        return Promise.reject(_msg)
      } catch {
        throw new Errors.BallotError
      }
    }
  })

}