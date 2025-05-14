import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
    get template(): string {
        return `
            <h2>User Details</h2>
            <div><b>Name</b>: ${this.model.get('name')}</div>
            <div><b>Age</b>: ${this.model.get('age')}</div>
        `;
    }
}