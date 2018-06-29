import url from './url'
import Errors from './Errors'


/**
 * @description Get salt as either dynamic salt or static salt.
 * @throws {Errors.SaltError}
 */
export default async function(): Promise<string> {
  let res: Response = await fetch(url.SALT, {
    credentials: 'include'
  })
  if(res.status != 200) throw new Errors.SaltError
  return await res.text()
}