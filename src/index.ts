import { UserForm } from "./views/UserForm";

const userForm = new UserForm(
    document.querySelector('main') as Element
);

userForm.render();