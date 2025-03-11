import type { IUserRepository } from '../../domain/repository/IUserRepository.ts'
import { User } from '../../domain/User.ts'
import type { UserId } from '../../domain/IUser.ts'
import type { UserAdapter } from './UserAdapter.ts'
import { UserSchema } from './UserAdapter.ts'
import { Role } from '../../domain/enums/Role.ts'

export class InMemoryUserRepository implements IUserRepository {
  private users: UserSchema[] = [
    {
      email: 'jsandovalbd1993@mail.com',
      id: '1',
      name: 'James David',
      lastName: 'Sandoval Bartra',
      role: Role.ADMIN,
      password: 'U2FsdGVkX18vogmdmDn46EliCInn7GoI6TiaOGck2rw=',
      isActive: true,
      isTheEmailConfirmed: true,
    },
  ]

  constructor(private readonly userAdapter: UserAdapter) {}

  exists(email: string): Promise<boolean> {
    const existsUser = this.users.find(
      (user) => user.email === email && user.isActive,
    )
    return Promise.resolve(!!existsUser)
  }

  save(user: User): Promise<User> {
    const newUser = User.create({
      ...user.props,
      id: (this.users.length + 1).toString(),
    })

    this.users.push(this.userAdapter.toPersistence(newUser))

    return Promise.resolve(newUser)
  }

  delete(id: UserId): Promise<void> {
    this.users.map((user) => {
      if (user.id === id) {
        return { ...user, isActive: false }
      }
      return user
    })

    return Promise.resolve()
  }

  find(): Promise<User[]> {
    const map = this.users.map(this.userAdapter.toDomain)
    return Promise.resolve(map)
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.email === email && user.isActive,
    )

    if (user) return Promise.resolve(this.userAdapter.toDomain(user))

    return Promise.resolve(null)
  }
}
