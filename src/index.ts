import { Collection } from './models/Collection';
import { User } from './models/User';

const rootURL = 'http://localhost:3000/users';

const collection = new Collection(rootURL);
const user = User.build({ id: '869a' });

collection.on('change', () => console.log(collection));
user.on('change', () => console.log(user));

collection.fetch();
user.fetch();