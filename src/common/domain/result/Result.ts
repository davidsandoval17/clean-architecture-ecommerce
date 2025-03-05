type Fail<L> = { kind: 'fail'; value: L }
type Ok<R> = { kind: 'ok'; value: R }
type ResultValue<L, R> = Fail<L> | Ok<R>

export class Result<L, R> {
  private constructor(private readonly result: ResultValue<L, R>) {}

  isFail(): boolean {
    return this.result.kind === 'fail'
  }

  isOk(): boolean {
    return this.result.kind === 'ok'
  }

  public static ok<R>(value: R) {
    return new Result<any, R>({ kind: 'ok', value })
  }

  public static fail<L>(value: L) {
    return new Result<L, any>({ kind: 'fail', value })
  }

  getValue(): ResultValue<L, R> {
    return this.result
  }

  fold(failFn: (left: L) => void, okFn: (right: R) => void): void {
    if (this.result.kind === 'fail') {
      return failFn(this.result.value)
    }
    return okFn(this.result.value)
  }
}
