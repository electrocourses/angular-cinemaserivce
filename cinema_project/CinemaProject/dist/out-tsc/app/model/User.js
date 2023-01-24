export class User {
    static fromHttp(user) {
        const newUser = new User();
        newUser.id = user.id;
        newUser.name = user.name;
        newUser.email = user.email;
        return newUser;
    }
}
//# sourceMappingURL=User.js.map