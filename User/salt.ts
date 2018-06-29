import url from './url'
import Errors from './Errors'


/**
 * @description Get salt as either dynamic salt or static salt.
 * @throws {Errors.SaltError}
 */
export default async function(): Promise<string> {
  return await fetch(url.SALT, {
    credentials: 'include'
  })
  .then(res => {
    if(res.status != 200) throw new Errors.SaltError
    return res.text()
  })
}