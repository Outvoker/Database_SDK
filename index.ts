import user from './user'
import blog from './blog'
import album from './album'
import photo from './photo'
import ballot from './ballot'
import ballotrecord from './ballotrecord'
import option from './option'
import notice from './notice'


let sdk = {
  user,
  blog,
  album,
  photo,
  ballot,
  ballotrecord,
  option,
  notice
}

declare var window: any
window.sdk = sdk

export default sdk
