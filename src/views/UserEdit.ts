import { View } from "./View";
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';
import { User, UserProps } from '../models/User';

export class UserEdit extends View<User, UserProps> {

    onRender(): void {
        new UserShow(this.regions.userDetails, this.model).render();
        new UserForm(this.regions.userForm, this.model).render();
    }

    regionsMap(): { [key: string]: string; } {
        return {
            userDetails: '.userDetails',
            userForm: '.userForm'
        }
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