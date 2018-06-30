import url from './url'
import Errors from './Errors'
import Blog from './Blog'
import assert from '../assert'


/**
 * @description Get a blog having specified `id`.
 * @param id Blog's id.
 */
export default async function(id: number): Promise<Blog> {
  assert(id, new Errors.BlogError('Bad parameters'))
  let res: Response = await fetch(`${url.FIND}/${id}`, {
    credentials: 'include'
  })
  let msg: string = await res.text()
  switch(res.status) {
    case 200: break
    case 404: throw new Errors.BlogNotFoundError
    default: throw new Errors.BlogError('Unable to get blog')
  }
  let blog: Blog
  try {
    blog = JSON.parse(msg)
  } catch {
    throw new Errors.BlogError('Unable to get blog')
  }
  assert(blog.id && blog.title, new Errors.BlogError('Unable to get blog'))
  return new Blog(blog)
}