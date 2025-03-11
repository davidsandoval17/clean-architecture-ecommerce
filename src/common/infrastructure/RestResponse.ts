export const httpStatus = {
  'Bad Request': 400,
  Unauthorized: 401,
}

export interface RestErrorResponse {
  statusCode: number
  error: string
  message?: string | string[]
}
