import url from './url'
import Errors from './Errors'
import Blog from './Blog'
import encodeSearchParams from '../encodeSearchParams'
import assert from '../assert'


export interface BlogFindArg {
  id?: number
  title?: string
  text?: string
  owner?: number
  omit?: string
  limit?: number
  skip?: number
  sort?: string
}

/**
 * @description Find a blog.
 * @param id Blog's id.
 * @param title Blog's title.
 * @param text Blog's text.
 * @param owner Blog's owner's id.
 * @param limit Blog's limit.
 * @param skip Blog's skip.
 * @param sort Blog's sort.
 */
export default async function(opt: BlogFindArg): Promise<Blog[]> {
  let res: Response = await fetch(url.FIND + '?' + encodeSearchParams(opt), {
    credentials: 'include'
  })
  let msg: string = await res.text()
  assert(res.status == 200, new Errors.BlogError(msg))
  let blogs: Blog[]
  try {
    blogs = JSON.parse(msg)
  } catch {
    throw new Errors.BlogError(msg)
  }
  assert(blogs instanceof Array, new Errors.BlogError('Unable to find blog'))
  return blogs.map(blog => new Blog(blog))
}