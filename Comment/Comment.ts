import Model from '../Model'
import User from '../User'


export default interface Comment extends Model {
  title: string
  text: string
  owner: User
}

export default class Comment extends Model implements Comment {
  constructor(opt: Comment) {
    super(opt)
    this.title = opt.title
    this.text = opt.text
    this.owner = opt.owner instanceof User ? opt.owner : new User(opt.owner)
  }
}