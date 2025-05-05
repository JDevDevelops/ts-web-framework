import { User } from '../models/User';

export class UserForm {

    constructor(public parent: Element, public model: User) {}

    eventMap(): { [key: string]: () => void} {
        return {
            'click:button': this.onButtonClick
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

    onButtonClick(): void {
        const input = document.getElementById('userInput') as HTMLInputElement;
        console.log(`User input: ${input.value}`);
    }

    template(): string {
        return `
            <div>
                <h2>User Form</h2>
                <div>User Name: ${this.model.get('name')}</div>
                <div>User Age: ${this.model.get('age')}</div>
                <input id="userInput" />
                <button>Click Me!</button>
            </div>
        `;
    }

    render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}