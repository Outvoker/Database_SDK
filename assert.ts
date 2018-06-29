export class AssertionError extends Error {}

export default function(condition: any, message?: string | Error): void {
  if(!condition) {
    if(message instanceof Error) throw message
    throw new AssertionError(message)
  }
}