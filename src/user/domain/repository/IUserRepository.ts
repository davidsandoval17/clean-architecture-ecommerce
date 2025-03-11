import type { User } from '../User.ts'
import type { UserId } from '../IUser.ts'

export interface IUserRepository {
  exists(email: string): Promise<boolean>
  save(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  find(): Promise<User[]>
  delete(id: UserId): Promise<void>
}
