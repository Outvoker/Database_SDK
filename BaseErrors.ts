namespace BaseErrors {
  export class ServerError extends Error {
    constructor(msg?: string) {
      super(msg || 'Server error')
    }
  }
  export class UnknownError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unknown error')
    }
  }
}

export default BaseErrors