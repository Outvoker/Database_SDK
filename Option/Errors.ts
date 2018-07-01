namespace Errors {
  export class OptionError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'Unable to create option'
    }
  }

  export class NotBloggerError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'You are not a blogger'
    }
  }
}

export default Errors