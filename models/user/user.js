const users = [];

class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this._id = ++User.id;
    }

    getName() {
        return `${this.firstName} ${this.lastName}`
    }

    static insert(firstName, lastName, age) {
        const nUser = new User(firstName, lastName, age);
        User.users.push(nUser);
        return nUser;
    }

    static getOneByName(firstName, lastName) {
        return User.users.find(u => u.firstName === firstName && u.lastName === lastName);
    }

    static getOneById(userId) {
        return User.users.find(u => u._id === userId);
    }

    static list(query) { //
        return User.users;
    }

    static get ['users']() {
        return users;
    }
}

// User.users = []; // 等同于 static get ['users']() { return users; }
User.id = 0;


// 等同于 static insert
// User.insert = function (firstName, lastName, age) {
//     const nUser = new User(...args);
//     User.users.push(nUser);
//     return nUser;
// }

// static 静态类方法，不需要new生成实例后才能调用

module.exports = User;

// console.log(User.list());
// console.log(User.insert('wang', 'xiaoming', 16));
// console.log(User.list());
// console.log(User.insert('li', 'xiaolang', 16));
// console.log(User.list());
// console.log(User.getOneByName('wang', 'xiaoming'));
