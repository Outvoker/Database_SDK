namespace Errors {
  export class CommentError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'Unable to create comment'
    }
  } 
}

export default Errors