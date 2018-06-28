import url from './url'
import assert from '../assert'


export namespace Errors {
  export class BallotError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to create ballot')
    }
  }
  
}

/**
 * @description Create a ballot.
 * @param title Ballot's title.
 * @param text Ballot's text.
 * @param published Ballot's publishment state.
 * @param owner Ballot's owner's id.
 */
export default async function(title: string, text: string, published: boolean, owner: number): Promise<string> {
  assert(owner > 0)
  let res: Response
  return await fetch(url.CREATE, {
    body: JSON.stringify({
      title,
      text,
      published,
      owner
    })
  })
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