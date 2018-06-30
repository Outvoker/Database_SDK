import url from './url'
import encodeSearchParams from '../encodeSearchParams'
import Comment from './Comment'
import Errors from './Errors'
import assert from '../assert'


interface NoticeFindArg {
  id?: number
  blog?: number
  text?: string
  owner?: number
  limit?: number
  skip?: number
  sort?: string
  omit?: string
}

/**
 * @description Find a comment.
 * @param id Notice's id.
 * @param blog Notice's blog.
 * @param text Notice's text.
 * @param owner Notice's owner's id.
 */
export default async function(opt: NoticeFindArg): Promise<Comment[]> {
  let res: Response = await fetch(url.FIND + '?' + encodeSearchParams(opt))
  let msg: string = await res.text()
  assert(res.status == 200, new Errors.CommentError(msg))
  let comments: Comment[]
  try {
    comments = JSON.parse(msg)
  } catch {
    throw new Errors.CommentError(msg)
  }
  assert(comments instanceof Array, new Errors.CommentError('Unable to find comment'))
  return comments.map(comment => new Comment(comment))
}