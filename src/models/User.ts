import { Eventing } from "./Eventing";
import { Sync } from './Sync';
import { Attributes } from "./Attributes";
import { AxiosResponse } from "axios";

export interface UserProps {
    id?: string;
    name?: string;
    age?: number;
}

const rootURL = 'http://localhost:3000/users';

export class User {
    private data: UserProps;
    public events =  new Eventing();
    public sync = new Sync<UserProps>(rootURL);
    public attributes: Attributes<UserProps>;

    constructor(data: UserProps) {
        this.attributes = new Attributes(data);
    }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: UserProps): void {
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