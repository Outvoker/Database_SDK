export class AssertionError extends Error {
  constructor(msg?: string) {
    super(msg)
    if(msg) console.error(msg)
    this.stack = (new Error).stack
    this.message = msg || 'Assertion error'
  }
}

export default function(condition: any, message?: string | Error): void {
  if(!condition) {
    if(message instanceof Error) throw message
    throw new AssertionError(message)
  }
}