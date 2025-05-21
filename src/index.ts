import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";
import { UserProps, User } from "./models/User";

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
    return User.build(json);
});

users.on('change', () => {
    const root = document.getElementById('root');
    if (root) {
        new UserList(root, users).render();
    }
    else {
        console.log('wtf mate?');
    }
});

users.fetch();