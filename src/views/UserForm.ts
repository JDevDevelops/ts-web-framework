import { User } from '../models/User';
import { View } from './View';

export class UserForm extends View {

    
    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    }
    
    onSetNameClick = (): void => {
        const input = this.parent.querySelector('#userInput') as HTMLInputElement;
        const name = input.value;
        this.model.set({ name });
        input.value = '';
    }
    
    eventMap(): { [key: string]: () => void } {
        return {
            'click:button#setName': this.onSetNameClick,
            'click:button#setRandomAge': this.onSetAgeClick
        };
    }
    
    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    get template(): string {
        return `
            <div>
                <div class="userDisplay">
                    <h2>User Form</h2>
                    <div>User Name: ${this.model.get('name')}</div>
                    <div>User Age: ${this.model.get('age')}</div>
                </div>
                <div class="userForm">
                    <input id="userInput" />
                    <button id="setName">Change Name</button>
                    <button id="setRandomAge">Set Random Age</button>

                </div>
            </div>
        `;
    }

    render(): void {
        this.parent.innerHTML = '';
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template;

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}