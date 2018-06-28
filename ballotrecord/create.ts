import url from './url'
import assert from '../assert'


export namespace Errors {
  export class BallotrecordError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to create ballotrecord')
    }
  }
  
}

/**
 * @description Create a ballotrecord.
 * @param ballot Ballotrecord's ballot.
 * @param option Ballotrecord's option.
 * @param owner Ballotrecord's owner's id.
 */
export default async function(ballot: number, option: number, owner: number): Promise<string> {
  assert(owner > 0)
  let res: Response
  return await fetch(url.CREATE, {
    body: JSON.stringify({
      ballot,
      option,
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
        return Promise.reject(new Errors.BallotrecordError)
      }
    }
  })

}