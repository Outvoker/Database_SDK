import Model from '../Model'
import url from './url'
import Errors from './Errors'
import salt from './salt'
import signup from './signup'
import login from './login'
import logout from './logout'


export default interface User extends Model {
  username: string
  nickname: string
  isBlogger: boolean
  isAdmin: boolean
  loggedIn?: boolean
}

export default class User extends Model implements User {
  constructor(opt: User) {
    super(opt)
    this.username = opt.username
    this.nickname = opt.nickname
    this.isBlogger = opt.isBlogger
    this.isAdmin = opt.isAdmin
    this.loggedIn = !!opt.loggedIn
  }

  static signup: (opt: { username: string; nickname: string; password: string }) => Promise<void> = signup
  static login: (opt: { username: string; password: string }) => Promise<void> = login
  static logout: () => Promise<void> = logout
  static salt: () => Promise<string> = salt
  static url = url
  static Errors = Errors

  async logout(): Promise<void> {
    return logout()
  }
}