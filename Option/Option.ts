import Model from '../Model'
import url from './url'
import create from './create'
import { OptionFindArg } from './find'
import find from './find'
import Errors from './Errors'


export default interface Option extends Model {
  title: string
  votes?: number
}

export default class Option extends Model implements Option {
  constructor(opt: {
    title: string
    votes?: number
  } & Model) {
    super(opt)
    this.title = opt.title
    this.votes = opt.votes || 0
  }

  static url = url
  static create: (opt: { title: string; ballot: number; owner: number }) => Promise<string> = create
  static find: (opt: OptionFindArg) => Promise<Option[]> = find
  static Errors = Errors
}