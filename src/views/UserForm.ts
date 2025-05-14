import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {

    eventsMap(): { [key: string]: () => void; } {
        return {
            'click:#setAge': this.onSetAgeClick,
            'click:#setName': this.onSetNameClick,
            'click:#saveModel': this.onSaveClick
        }
    }
    
    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    }
    
    onSetNameClick = (): void => {
        const input = this.parent.querySelector('#userNameInput') as HTMLInputElement;
        const name = input.value;
        input.value = '';
        this.model.set({ name });
        input.value = '';
    }

    onSaveClick = (): void => {
        this.model.save();
    }

    get template(): string {
        return `
            <div class="user">
                <h2>User Data</h2>
                <div><b>Name</b>: ${this.model.get('name')}</div>
                <div><b>Age</b>: ${this.model.get('age')}</div>
            </div>
            <div class="input">
                <input id="userNameInput" />
            </div>
            <div class="buttons">
                <button id="setName">Change Name</button>
                <button id="setAge">Set Random Age</button>
                <button id="saveModel">Save User</button>
            </div>
        `;
    }
}