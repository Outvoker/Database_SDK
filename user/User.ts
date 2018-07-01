import assert from '../assert'
import Model from '../Model'
import url from './url'
import Errors from './Errors'
import salt from './salt'
import signup from './signup'
import login from './login'
import logout from './logout'
import state from './state'
import get from './get'
import Blog from '../Blog'
import generateAvatar from '../../generateAvatar'
import Ballot from '../Ballot';


export default interface User extends Model {
  username: string
  nickname: string
  isBlogger: boolean
  isAdmin: boolean
  loggedIn?: boolean
  avatar?: string
}

export default class User extends Model implements User {

  constructor(opt: {
    nickname: string
    isBlogger: boolean
    isAdmin: boolean
    loggedIn?: boolean
    avatar?: string
  } & Model, globalInstance: boolean = false) {
    super(opt)
    this.nickname = opt.nickname
    this.isBlogger = opt.isBlogger
    this.isAdmin = opt.isAdmin
    this.loggedIn = !!opt.loggedIn
    this.avatar = opt.avatar && opt.avatar != 'default' ? opt.avatar : generateAvatar(opt.nickname, opt.id)
    if(globalInstance) {
      try {
        // Object.defineProperty(window, 'user', {
        //   value: this,
        //   writable: true,
        //   configurable: true,
        //   enumerable: true
        // })
        (window as any).user = this
      } catch {
        try {
          // Object.defineProperty(global, 'user', {
          //   value: this,
          //   writable: true,
          //   configurable: true,
          //   enumerable: true
          // })
          (global as any).user = this
        } catch {}
      }
    }
  }

  static signup: (opt: { username: string; nickname: string; password: string }) => Promise<void> = signup
  static logout: () => Promise<void> = logout
  static salt: () => Promise<string> = salt
  static state: () => Promise<User | null> = state
  static get: (id: number) => Promise<User> = get
  static url = url
  static Errors = Errors

  /**
   * @description Login. Resolve the user's ID.
   * @param opt User's username and password.
   */
  static async login(opt: { username: string; password: string }, globalInstance: boolean = false): Promise<User> {
    let uid = await login(opt)
    let user: User | null = await state()
    assert(user, new Errors.LoginError)
    user = new User(user as User, globalInstance)
    user.loggedIn = true
    user.username = opt.username
    return user
  }

  /**
   * @description Logout.
   */
  async logout(): Promise<void> {
    assert(this.loggedIn, new Errors.AlreadyLoginError)
    await logout()
    this.loggedIn = false
  }

  /**
   * @description Get blogs written by this user.
   */
  async getBlogs(opt: { pageNum: number; pageSize: number; ascend?: boolean }): Promise<[Blog[], number]> {
    assert(opt.pageSize && opt.pageNum)
    return await Promise.all([
      Blog.find({
        owner: this.id,
        omit: 'text',
        sort: 'createdAt ' + (opt.ascend ? 'ASC' : 'DESC'),
        limit: opt.pageSize,
        skip: (opt.pageNum - 1) * opt.pageSize
      }),
      Blog.count(this.id)
    ])
  }

  async getBallots(opt: { pageNum: number; pageSize: number; ascend?: boolean }): Promise<[Ballot[], number]> {
    assert(opt.pageSize && opt.pageNum)
    return await Promise.all([
      Ballot.find({
        owner: this.id,
        omit: 'text',
        sort: 'createdAt ' + (opt.ascend ? 'ASC' : 'DESC'),
        limit: opt.pageSize,
        skip: (opt.pageNum - 1) * opt.pageSize
      }),
      Ballot.count(this.id)
    ])
  }

  async createBlog(opt: { title: string; text: string }): Promise<void> {
    assert(opt.title && opt.text)
    await Blog.create({
      ...opt,
      owner: this
    })
  }
}