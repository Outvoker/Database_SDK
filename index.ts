import User from './User'
import Blog from './Blog'
import Album from './Album'
import Photo from './Photo'
import Ballot from './Ballot'
import BallotRecord from './BallotRecord'
import Option from './Option'
import Notice from './Notice'
import Comment from './Comment'


let sdk = {
  User,
  Blog,
  Album,
  Photo,
  Ballot,
  BallotRecord,
  Option,
  Notice,
  Comment
}

declare var window: any
window.sdk = sdk

export default sdk
