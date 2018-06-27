export class AssertionError extends Error {}

export default function(condition: any, message?: string): void {
  if(!condition) throw new AssertionError(message)
}