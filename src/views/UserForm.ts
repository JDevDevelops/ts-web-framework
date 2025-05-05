export class UserForm {

    constructor(public parent: Element) {}

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
        console.log('Button Clicked!');
    }

    template(): string {
        return `
            <div>
                <h2>User Form</h2>
                <input />
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