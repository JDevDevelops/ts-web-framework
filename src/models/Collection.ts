import axios, { AxiosResponse } from 'axios';
import { Eventing } from "./Eventing";
import { IEvents } from './Model';

export class Collection<T, K> implements IEvents {
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(
        public rootURL: string,
        public deserialize: (json: K) => T
    ) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch(): void {
        axios.get(this.rootURL).then( response => {
            response.data.forEach((value: K) => {
                this.models.push(this.deserialize(value));
            });
            this.trigger('change');
        })
    }
}