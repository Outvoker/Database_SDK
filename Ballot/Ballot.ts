import assert from '../assert'
import Model from '../Model'
import url from './url'
import create from './create'
import del from './delete'
import update from './update'
import find from './find'
import get from './get'
import count from './count'
import { BallotFindArg } from './find'
import Errors from './Errors'
import User from '../User'
import Comment from '../Comment'


export default interface Ballot extends Model {
  title: string
  text: string
  published: boolean
  owner: User
}

export default class Ballot extends Model implements Ballot {
  constructor(opt: {
    title: string
    text: string
    published: boolean
    owner: User
  } & Model) {
    super(opt)
    this.title = opt.title
    this.text = opt.text
    this.published = opt.published
    this.owner = opt.owner instanceof User ? opt.owner : new User(opt.owner)
  }

  static delete: (id: number) => Promise<string> = del
  static update: (opt: { id: number; title?: string; text?: string; published?: boolean }) => Promise<string> = update
  static find: (opt: BallotFindArg) => Promise<Ballot[]> = find
  static get: (id: number) => Promise<Ballot> = get
  static count: (id?: number) => Promise<number> = count
  static url = url
  static Errors = Errors

  /**
   * @description Get hot ballot list.
   * @param pageNum Page number.
   * @param pageSize Ballots per page.
   */
  static async getHotBallots(pageNum: number, pageSize: number, ascend: boolean = false): Promise<[Ballot[], number]> {
    assert(pageNum && pageSize)
    return [await find({
      omit: 'text',
      limit: pageSize,
      skip: (pageNum - 1) * pageSize,
      sort: 'updatedAt ' + (ascend ? 'ASC' : 'DESC')
    }), await count()]
  }

  /**
   * @description Create a new ballot.
   * @param opt Ballot's title and text.
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
   * @description Update the ballot.
   * @param opt Updated title and/or text.
   */
  async update(opt: { title: boolean; text: boolean }): Promise<string> {
    assert(this.id && (opt.title || opt.text), new Errors.BallotError('Unable to update ballot'))
    return await update({
      id: this.id,
      ...opt.title ? { title: this.title } : {},
      ...opt.text ? { text: this.text } : {},
      published: true
    })
  }

  /**
   * @description Delete the ballot.
   */
  async delete(): Promise<string> {
    assert(this.id, new Errors.BallotError('Unable to delete ballot'))
    let res: string = await del(this.id)
    this.id = 0
    return res
  }
}