import Model from '../Model'
import user from './index'

interface User extends Model {
  username: string
  nickname: string
  isBlogger: boolean
  isAdmin: boolean
  loggedIn?: boolean
}

class User extends Model implements User {
  constructor(opt: User) {
    super(opt)
    this.username = opt.username
    this.nickname = opt.nickname
    this.isBlogger = opt.isBlogger
    this.isAdmin = opt.isAdmin
    this.loggedIn = !!opt.loggedIn
  }

  async login(password: string): Promise<void> {
    return user.login(this.username, password)
  }

  async logout(): Promise<void> {
    return user.logout()
  }
}

export default User