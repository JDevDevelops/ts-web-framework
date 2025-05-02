import { User } from './models/User';

const user = new User({ id: '869a', name: "Bilbo Baggins", age: 104 });

user.on('save', () => console.log(user));

user.save();