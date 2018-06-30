namespace Errors {
  export class BlogError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'Unable to create blog'
    }
  }

  export class NotBloggerError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'You are not a blogger'
    }
  }

  export class BlogNotFoundError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'Blog not found'
    }
  }
}

export default Errors