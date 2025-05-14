import { View } from "./View";
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';
import { User, UserProps } from '../models/User';

export class UserEdit extends View<User, UserProps> {

    regionsMap(): { [key: string]: string; } {
        return {
            userDetails: '.userDetails',
            userForm: '.userForm'
        }
    }

    onRender(): void {
        const userShow = new UserShow(this.regions.userShow, this.model).render();
        const userForm = new UserForm(this.regions.userForm, this.model).render();
    }

    get template(): string {
        return `
            <div class="userEdit">
                <div class="userDetails"></div>
                <div class="userForm"></div>
            </div>
        `;
    }
}