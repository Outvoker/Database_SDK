namespace Errors {
  export class SaltError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to get salt')
    }
  }
  export class LoginError extends Error {
    constructor(msg?: string) {
      super(msg || 'Login error')
    }
  }
  export class AlreadyLoginError extends Error {
    constructor(msg?: string) {
      super(msg || 'Already logged in')
    }
  }
  export class UsernameOrPasswordError extends Error {
    constructor(msg?: string) {
      super(msg || 'Username or password incorrect')
    }
  }

  export class LogoutError extends Error {
    constructor(msg?: string) {
      super(msg || 'Logout error')
    }
  }

  export class SignupError extends Error {
    constructor(msg?: string) {
      super(msg || 'Signup error')
    }
  }
  export class UsernameExistsError extends Error {
    constructor(msg?: string) {
      super(msg || 'Username already been taken')
    }
  }

  export class StateError extends Error {
    constructor(msg?: string) {
      super(msg || 'Unable to get user\'s state')
    }
  }
}

export default Errors