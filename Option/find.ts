import url from './url'
import encodeSearchParams from '../encodeSearchParams'


export namespace Errors {
  export class OptionError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to find option')
    }
  }
  
}

interface OptionFindArg {
  id?: number,
  ballot?: number,
  title?: string,
  owner?: number,
  limit?: number,
  skip?: number,
  sort?: string
}
/**
 * @description Find a option.
 * @param id Option's id.
 * @param title Option's title.
 * @param ballot Option's ballot.
 * @param owner Option's owner's id.
 * @param limit Option's limit.
 * @param skip Option's skip.
 * @param sort Option's sort.
 */
export default async function(opt: OptionFindArg): Promise<string> {
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
        return Promise.reject(new Errors.OptionError)
      }
    }
  })

}