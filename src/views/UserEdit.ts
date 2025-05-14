import { View } from "./View";
import { User, UserProps } from '../models/User';

export class UserEdit extends View<User, UserProps> {

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