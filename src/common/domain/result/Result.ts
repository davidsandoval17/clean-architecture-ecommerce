type Fail<L> = { kind: 'fail'; value: L }
type Ok<R> = { kind: 'ok'; value: R }
type IResult<L, R> = Fail<L> | Ok<R>

export class Result<L, R> {
  private constructor(private result: IResult<L, R>) {}

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

  getFailValue(): L {
    if (this.result.kind === 'ok') {
      throw new Error('Get fail value error')
    }

    return this.result.value
  }

  getValue(): R {
    if (this.result.kind === 'fail') {
      throw new Error('Get ok value error')
    }

    return this.result.value
  }

  fold(failFn: (left: L) => void, okFn: (right: R) => void): void {
    if (this.result.kind === 'fail') {
      return failFn(this.result.value)
    }
    return okFn(this.result.value)
  }
}
