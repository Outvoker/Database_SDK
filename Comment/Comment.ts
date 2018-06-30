import Model from '../Model'
import User from '../User'


export default interface Comment extends Model {
  title: string
  text: string
  owner: User
}