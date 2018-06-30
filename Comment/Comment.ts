import Model from '../Model'
import User from '../User'
import url from './url'
import create from './create'
import del from './delete'
import update from './update'
import find from './find'
import { CommentFindArg } from './find'
import Errors from './Errors'


export default interface Comment extends Model {
  text: string
  owner: User
}

export default class Comment extends Model implements Comment {
  constructor(opt: Comment) {
    super(opt)
    this.text = opt.text
    this.owner = opt.owner instanceof User ? opt.owner : new User(opt.owner)
  }

  static url = url
  static create: (opt: { blog: number, text: string, owner: number }) => Promise<string> = create
  static delete: (id: number) => Promise<string> = del
  static update: (opt: { id: number; text?: string }) => Promise<string> = update
  static find: (opt: CommentFindArg) => Promise<Comment[]> = find
  static Errors = Errors
}