import url from './url'
import encodeSearchParams from '../encodeSearchParams'


export namespace Errors {
  export class BallotrecordError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find ballotrecord')
    }
  }
  
}

interface BallotrecordFindArg {
  id?: number,
  ballot?: number,
  option?: number,
  owner?: number,
  limit?: number,
  skip?: number,
  sort?: string
}
/**
 * @description Find a ballotrecord.
 * @param id Ballotrecord's id.
 * @param ballot Ballotrecord's ballot.
 * @param option Ballotrecord's option.
 * @param owner Ballotrecord's owner's id.
 * @param limit Ballotrecord's limit.
 * @param skip Ballotrecord's skip.
 * @param sort Ballotrecord's sort.
 */
export default async function(opt: BallotrecordFindArg): Promise<string> {
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
        return Promise.reject(new Errors.BallotrecordError)
      }
    }
  })

}