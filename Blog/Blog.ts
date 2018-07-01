import assert from '../assert'
import Model from '../Model'
import url from './url'
import create from './create'
import del from './delete'
import update from './update'
import find from './find'
import get from './get'
import count from './count'
import { BlogFindArg } from './find'
import Errors from './Errors'
import User from '../User'
import Comment from '../Comment'


export default interface Blog extends Model {
  title: string
  text: string
  published: boolean
  owner: User
  comments?: Comment[]
}

export default class Blog extends Model implements Blog {
  constructor(opt: {
    title: string
    text: string
    published: boolean
    owner: User
    comments?: Comment[]
  } & Model) {
    super(opt)
    this.title = opt.title
    this.text = opt.text
    this.published = opt.published
    this.owner = opt.owner instanceof User ? opt.owner : new User(opt.owner)
    this.comments = (opt.comments || []).map(comment => (comment instanceof Comment) ? comment : new Comment(comment))
  }

  static delete: (id: number) => Promise<string> = del
  static update: (opt: { id: number; title?: string; text?: string; published?: boolean }) => Promise<string> = update
  static find: (opt: BlogFindArg) => Promise<Blog[]> = find
  static get: (id: number) => Promise<Blog> = get
  static count: (id?: number) => Promise<number> = count
  static url = url
  static Errors = Errors

  /**
   * @description Get hot blog list.
   * @param pageNum Page number.
   * @param pageSize Blogs per page.
   * @param ascend Return result in ascending or descending order.
   */
  static async getHotBlogs(opt: { pageNum: number; pageSize: number; ascend?: boolean; search?: string }): Promise<[Blog[], number]> {
    assert(opt.pageNum && opt.pageSize)
    return [await find({
      omit: 'text',
      limit: opt.pageSize,
      skip: (opt.pageNum - 1) * opt.pageSize,
      sort: 'updatedAt ' + (opt.ascend ? 'ASC' : 'DESC'),
      ...(opt.search ? {
        where: {
          title: {
            contains: opt.search
          }
        }
      } : {})
    }), await count()]
  }

  /**
   * @description Create a new blog.
   * @param opt Blog's title and text.
   */
  static async create(opt: { title: string; text: string; owner: User }): Promise<void> {
    assert(opt.owner.isBlogger, new Errors.NotBloggerError)
    await create({
      ...opt,
      published: true,
      owner: opt.owner.id
    })
  }

  /**
   * @description Update the blog.
   * @param opt Updated title and/or text.
   */
  async update(opt: { title: boolean; text: boolean }): Promise<string> {
    assert(this.id && (opt.title || opt.text), new Errors.BlogError('Unable to update blog'))
    return await update({
      id: this.id,
      ...opt.title ? { title: this.title } : {},
      ...opt.text ? { text: this.text } : {},
      published: true
    })
  }

  /**
   * @description Delete the blog.
   */
  async delete(): Promise<string> {
    assert(this.id, new Errors.BlogError('Unable to delete blog'))
    let res: string = await del(this.id)
    this.id = 0
    return res
  }
}