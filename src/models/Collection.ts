import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from "./User";
import { Eventing } from "./Eventing";

export class Collection {
    models: User[] = [];
    events: Eventing = new Eventing();

    constructor(public rootURL: string) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    async fetch(): Promise<void> {
        const response = await axios.get(this.rootURL);
        response.data.forEach((value: UserProps) => {
            this.models.push(User.build(value));
        });
    }
}