import url from './url'
import assert from '../assert'
import Errors from './Errors'


/**
 * @description Create an option.
 * @param title Option's title.
 * @param ballot Option's ballot.
 * @param owner Option's owner's id.
 */
export default async function(opt: { title: string; ballot: number; owner: number }): Promise<string> {
  assert(opt.owner > 0 && opt.ballot > 0)
  let res: Response = await fetch(url.CREATE, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opt)
  })
  let msg: string = await res.text()
  switch(res.status) {
    case 200: return msg
    case 403: throw new Errors.NotBloggerError 
    default: throw new Errors.OptionError
  }
}