import url from './url'


/**
 * @description Get salt as either dynamic salt or static salt.
 */
export default async function(): Promise<string> {
  return await fetch(url.SALT)
  .then(res => res.text())
}