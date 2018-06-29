import assert from '../assert'
import Model from '../Model'
import url from './url'
import Errors from './Errors'
import salt from './salt'
import signup from './signup'
import login from './login'
import logout from './logout'
import state from './state'


export default interface User extends Model {
  username: string
  nickname: string
  isBlogger: boolean
  isAdmin: boolean
  loggedIn?: boolean
}

export default class User extends Model implements User {
  LoggedIn: boolean = false

  constructor(opt: User) {
    super(opt)
    this.username = opt.username
    this.nickname = opt.nickname
    this.isBlogger = opt.isBlogger
    this.isAdmin = opt.isAdmin
    this.loggedIn = !!opt.loggedIn
  }

  static signup: (opt: { username: string; nickname: string; password: string }) => Promise<void> = signup
  static logout: () => Promise<void> = logout
  static salt: () => Promise<string> = salt
  static state: () => Promise<User | null> = state
  static url = url
  static Errors = Errors

  /**
   * @description Login. Resolve the user's ID.
   * @param opt User's username and password.
   */
  static async login(opt: { username: string; password: string }): Promise<User> {
    let uid = await login(opt)
    let user: User | null = await state()
    assert(user)
    user = new User(user as User)
    user.LoggedIn = true
    return user
  }

  /**
   * @description Logout.
   */
  async logout(): Promise<void> {
    assert(this.loggedIn, new Errors.AlreadyLoginError)
    logout()
  }
}