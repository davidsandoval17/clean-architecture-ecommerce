import type { User } from './User.ts'
import type { UserProps } from './User.interface.ts'

export interface UserRepository {
  exists(email: string): Promise<boolean>
  save(user: UserProps): Promise<User>
}
