import { User } from './models/User';

const user = User.build({ id: '869a' });

user.on('change', () => console.log(user));

user.fetch();