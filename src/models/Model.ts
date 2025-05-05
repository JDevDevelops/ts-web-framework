import { AxiosPromise, AxiosResponse } from "axios";

export interface IAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    set(newProps: T): void;
    get all(): T;
}

export interface IEvents {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}

export interface ISync<T> {
    fetch(id: string): AxiosPromise;
    save(data: T): AxiosPromise;
}

export interface hasID {
    id?: string
}

export type Callback = () => void;

export class Model<T extends hasID> {

    constructor(
        private events: IEvents,
        private attributes: IAttributes<T>,
        private sync: ISync<T>
    ){}

    get on() {
            return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    async fetch(): Promise<void> {
        const id = this.attributes.get('id');

        if(!id) {
            throw new Error('Cannot fetch without an id!');
        }

        const response =  await this.sync.fetch(id) as AxiosResponse;
        this.set(response.data);
    }

    async save(): Promise<void> {
        try {
            const response = await this.sync.save(this.attributes.all) as AxiosResponse;
            this.trigger('save');
        }
        catch(error)
        {
            this.trigger('error');
        }
    }
}