import User from './User'
import Blog from './Blog'
import Album from './Album'
import Photo from './Photo'
import Ballot from './Ballot'
import Ballotrecord from './Ballotrecord'
import Option from './Option'
import Notice from './Notice'


let sdk = {
  User,
  Blog,
  Album,
  Photo,
  Ballot,
  Ballotrecord,
  Option,
  Notice,
}

declare var window: any
window.sdk = sdk

export default sdk
