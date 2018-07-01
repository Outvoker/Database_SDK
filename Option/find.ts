import url from './url'
import encodeSearchParams from '../encodeSearchParams'
import Option from './Option'
import Errors from './Errors'
import assert from '../assert'


export interface OptionFindArg {
  id?: number
  ballot?: number
  title?: string
  owner?: number
  limit?: number
  skip?: number
  sort?: string
  where?: any
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
export default async function(opt: OptionFindArg): Promise<Option[]> {
  if(opt.where) opt.where = JSON.stringify(opt.where || {})
  let res: Response = await fetch(url.FIND + '?' + encodeSearchParams(opt))
  let msg: string = await res.text()
  assert(res.status == 200, new Errors.OptionError(msg))
  let options: Option[]
  try {
    options = JSON.parse(msg)
  } catch {
    throw new Errors.OptionError(msg)
  }
  assert(options instanceof Array, new Errors.OptionError('Unable to find option'))
  return options.map(option => new Option(option))
}