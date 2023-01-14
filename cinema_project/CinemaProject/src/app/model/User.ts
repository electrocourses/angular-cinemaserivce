export class User {
  id: number;
  name: string;
  email: string;

  static fromHttp(user: User): User {
    const newUser = new User();
    newUser.id = user.id;
    newUser.name = user.name;
    newUser.email = user.email;
    return newUser;
  }
}
