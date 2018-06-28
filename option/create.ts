import url from './url'
import assert from '../assert'


export namespace Errors {
  export class OptionError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to create option')
    }
  }
  
}

/**
 * @description Create an option.
 * @param title Option's title.
 * @param ballot Option's ballot.
 * @param owner Option's owner's id.
 */
export default async function(title: string, ballot: number, owner: number): Promise<string> {
  assert(owner > 0 && ballot > 0)
  let res: Response
  return await fetch(url.CREATE, {
    body: JSON.stringify({
      title,
      ballot,
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
        return Promise.reject(new Errors.OptionError)
      }
    }
  })

}