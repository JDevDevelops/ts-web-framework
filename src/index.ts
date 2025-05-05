import { UserForm } from "./views/UserForm";
import { User } from "./models/User";

const user = User.build({ name: 'Debbie Downer', age: 55 });

const userForm = new UserForm(document.querySelector('main') as Element, user);

userForm.render();