import user from './user'
import blog from './blog'


let sdk = {
  user,
  blog
}

declare var window: any
window.sdk = sdk

export default sdk
