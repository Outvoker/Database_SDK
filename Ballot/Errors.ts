namespace Errors {
  export class BallotError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'Unable to create ballot'
    }
  }

  export class NotBloggerError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'You are not a ballotger'
    }
  }

  export class BallotNotFoundError extends Error {
    constructor(msg?: string) {
      super()
      this.stack = (new Error).stack
      this.message = msg || 'Ballot not found'
    }
  }
}

export default Errors