import { UserForm } from "./views/UserForm";
import { User } from "./models/User";

const user = User.build({ name: 'Debbie Downer', age: 55 });
const form = document.getElementById('userForm') as Element;
const userForm = new UserForm(form, user);
userForm.render();