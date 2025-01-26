export class UserRole {
  public static allRoles: {[name: number]: UserRole} = {}
  public static roles: {id: number, name: string}[] = []

  static readonly default: UserRole = new UserRole(0, "User")
  static readonly moderator: UserRole = new UserRole(1, "Moderator")
  static readonly admin: UserRole = new UserRole(2, "Admin")

  constructor(public readonly id: number, public name: string) {
    UserRole.allRoles[id] = this
    UserRole.roles.push(this)
  }

  public static parseEnum(data: number) : UserRole {
    return UserRole.allRoles[data];
  }
}
