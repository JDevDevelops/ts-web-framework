import { View } from "./View";
import { User, UserProps } from '../models/User';
import { UserShow } from "./UserShow";
import { UserForm } from "./UserForm";

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