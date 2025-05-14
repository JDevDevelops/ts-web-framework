import { User } from '../models/User';
import { Model, hasID } from '../models/Model';

export abstract class View<T extends Model<K>, K extends hasID> {
    regions: { [key: string]: Element } = {}

    constructor(public parent: Element, public model: User) {
            this.bindModel();
    }

    abstract get template(): string;

    regionsMap(): { [key: string]: string} {
        return {}
    }

    eventsMap(): { [key: string]: () => void } {
        return {}
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    bindModel(): void {
        this.model.on('change', () => this.render());
    }

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);

            if (element) {
                this.regions[key] = element;
            }
            else {
                throw new Error(`${selector} not found!`);
            }
        }
    }

    render(): void {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template;

        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.parent.append(templateElement.content);
    }
}